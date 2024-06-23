const { readdirSync, rename, lstatSync, rmdir, rmSync } = require('fs');
const { resolve } = require('path');

// ---------------- Utils ----------------
const FOLDERS_TO_IGNORE = ['static', 'page-data'];
const FILES_TO_REMOVE = ['webpack.stats.json'];
function callback(cb) {
	return (err) => {
		if (err) {
			console.log(err);
		} else {
			cb();
		}
	};
}

function getPath(folder, parentDirs = []) {
	return `${publicDirPath}/${parentDirs.length ? parentDirs.join('/') + '/' : ''}${folder}`;
}

function isPageFolder(files) {
	return files.length === 1 && files[0] === 'index.html';
}

function filterFolders(folders, parentDirs = []) {
	return folders.filter((folder) => {
		const path = getPath(folder, parentDirs);

		return lstatSync(path).isDirectory() && !FOLDERS_TO_IGNORE.includes(folder);
	});
}

// ---------------- Main ----------------
// Get path to public directory
const publicDirPath = resolve(__dirname, 'public');
handleFolders(readdirSync(publicDirPath));
removeRedundantFiles();
removeAllFilesWithTxtExtension();

function handleFolders(folders, parentDirs = []) {
	// Loop through each file that was retrieved
	filterFolders(folders, parentDirs).forEach((folder) => {
		const dir = getPath(folder, parentDirs);
		const folderFiles = readdirSync(dir);
		// is this a folder that contains a single index.html file
		if (isPageFolder(folderFiles)) {
			// extract html file outside folder
			handlePageFolder(folder, parentDirs);
		} else {
			// recursivley traverse folders
			handleFolders(folderFiles, [...parentDirs, folder]);
		}
	});
}

// move index file outside of folder and temporarily rename it
// to avoid conflict with folder name
// Then, remove the empty folder
function handlePageFolder(folder, parentDirs = []) {
	const currDir = getPath(`${folder}/index.html`, parentDirs);
	const nextDir = getPath(`${folder}-temp`, parentDirs);
	rename(
		currDir,
		nextDir,
		callback(() => {
			removeFolder(folder, parentDirs);
		})
	);
}

// remove folder and then rename the file back to the folder name
function removeFolder(folder, parentDirs) {
	const dir = getPath(folder, parentDirs);

	rmdir(
		dir,
		callback(() => {
			renamePageFile(folder, parentDirs);
		})
	);
}

// rename the file back to the folder name
function renamePageFile(folder, parentDirs) {
	const currDir = getPath(`${folder}-temp`, parentDirs);
	const nextDir = getPath(folder, parentDirs);

	rename(
		currDir,
		nextDir,
		callback(() => {})
	);
}

function removeRedundantFiles() {
	FILES_TO_REMOVE.forEach((file) => {
		try {
			const path = resolve(publicDirPath, file);
			if (lstatSync(path).isFile()) {
				rmSync(
					path,
					{ force: true },
					callback(() => {})
				);
			}
		} catch (e) {
			console.log(`failed to remove file: ${file} because of error: ${e.message}`);
		}
	});
}

function removeAllFilesWithTxtExtension() {
	const files = readdirSync(publicDirPath);

	files.forEach((file) => {
		const path = resolve(publicDirPath, file);

		if (lstatSync(path).isFile() && file.endsWith('.txt')) {
			rmSync(
				path,
				{ force: true },
				callback(() => {})
			);
		}
	});
}
