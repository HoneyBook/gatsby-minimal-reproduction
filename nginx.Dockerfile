FROM nginx:alpine

COPY ./docker/ /usr/share/nginx/html/

RUN sed -i 's/default_type  application\/octet-stream;/default_type  text\/html;/g' /etc/nginx/nginx.conf
RUN sed -i 's/        index  index.html index.htm;/        index  index.html index.htm;\n        add_header Content-Encoding gzip always;/g' /etc/nginx/conf.d/default.conf
#RUN sed -i 's/#error_page  404              \/404.html;/     location \/page-data {\n         root   \/usr\/share\/nginx\/html;\n         index  index.html index.htm;\n 	      gzip on;\n         gzip_static on;\n     }/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/#error_page  404              \/404.html;/error_page  404              \/404;/g' /etc/nginx/conf.d/default.conf
