import{_ as s,c as n,o as a,d as l}from"./app.18b2d180.js";const p="/ssl-buy.png",e="/ssl-download.png",t="/2024-ssl-buy.png",D=JSON.parse('{"title":"如何将网站改为https","description":"","frontmatter":{},"headers":[{"level":2,"title":"关键词","slug":"关键词","link":"#关键词","children":[]},{"level":2,"title":"解决思路 && 执行命令","slug":"解决思路-执行命令","link":"#解决思路-执行命令","children":[]},{"level":2,"title":"至此，网站从http改为https，有效期为1年😂。","slug":"至此-网站从http改为https-有效期为1年😂。","link":"#至此-网站从http改为https-有效期为1年😂。","children":[]}],"relativePath":"web/ssl.md"}'),o={name:"web/ssl.md"},i=l('<h1 id="如何将网站改为https" tabindex="-1">如何将网站改为https <a class="header-anchor" href="#如何将网站改为https" aria-hidden="true">#</a></h1><blockquote><p>背景：个人网站http发布很简单，但是怎么改为https呢，往下看吧😁。</p></blockquote><h2 id="关键词" tabindex="-1">关键词 <a class="header-anchor" href="#关键词" aria-hidden="true">#</a></h2><p>docker nginx ssl</p><h2 id="解决思路-执行命令" tabindex="-1">解决思路 &amp;&amp; 执行命令 <a class="header-anchor" href="#解决思路-执行命令" aria-hidden="true">#</a></h2><ol><li><p>申请免费的ssl证书</p><ul><li><img src="'+p+'"></li></ul><p>可以申请20个，只能薅一年的有效期。</p></li><li><p>下载数字证书</p><ul><li><img src="'+e+`"></li></ul><p>根据web容器的类型，选择对应文件下载</p></li><li><p>nginx配置</p><ul><li>配置443端口</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">   listen       443 ssl;</span></span>
<span class="line"><span style="color:#A6ACCD;">   server_name  www.nhtimes.top;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_certificate      /etc/nginx/ssl/9173122_www.nhtimes.top.pem;</span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_certificate_key  /etc/nginx/ssl/9173122_www.nhtimes.top.key;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#A6ACCD;">   #表示使用的加密套件的类型。</span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型，您需要自行评估是否配置TLSv1.1协议。</span></span>
<span class="line"><span style="color:#A6ACCD;">   ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#A6ACCD;">   location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">      proxy_set_header   X-Real-IP         $remote_addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">      proxy_set_header   Host              $http_host;</span></span>
<span class="line"><span style="color:#A6ACCD;">      proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#A6ACCD;">      root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">      index  index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">      try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">   error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">   location = /50x.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">      root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>主要是配置证书路径，这个地址需要写挂载的地址，不是存储地址。</p><ul><li>配置http默认重定向跳转为https</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">   listen       80;</span></span>
<span class="line"><span style="color:#A6ACCD;">   listen  [::]:80;</span></span>
<span class="line"><span style="color:#A6ACCD;">   server_name  www.nhtimes.top;</span></span>
<span class="line"><span style="color:#A6ACCD;">   rewrite ^(.*) https://$server_name$1 permanent;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>docker运行脚本</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker run --name vitepress-blog-ssl -p 80:80 -p 443:443 -v </span></span>
<span class="line"><span style="color:#A6ACCD;">/opt/nginx/blog/html:/usr/share/nginx/html -v </span></span>
<span class="line"><span style="color:#A6ACCD;">/opt/nginx/blog/log:/var/log/nginx -v </span></span>
<span class="line"><span style="color:#A6ACCD;">/opt/nginx/blog/conf/nginx.conf:/etc/nginx/nginx.conf -v </span></span>
<span class="line"><span style="color:#A6ACCD;">/opt/nginx/blog/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v </span></span>
<span class="line"><span style="color:#A6ACCD;">/opt/nginx/blog/ssl:/etc/nginx/ssl/ </span></span>
<span class="line"><span style="color:#A6ACCD;">--privileged=true -d --restart=always nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>需要注意的是要定义443端口，我研究了2天，镜像运行正常，但是网站出不来，就是少了443端口， 即使开放了80端口，但是依然会重定向到https，这个坑填了两天😂。</p></li><li><p>docker 进入容器查看里面文件是否挂载成功 排查问题，发现一个进入容器内部的命令</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker exec -it 45 bash</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这个45是镜像id的前两位，可以简写。</p></li><li><p>ssl证书已改为3个月的免费期😂，在网站中申请并下载，替换到原始文件夹内，或者使用自动化部署即可，完成后重启docker应用就完事啦。</p><ul><li><img src="`+t+'"></li></ul><p>目前只能一年领取一次了，只有3个月。</p><p>by 2024-01-28</p></li></ol><h2 id="至此-网站从http改为https-有效期为1年😂。" tabindex="-1">至此，网站从http改为https，有效期为1年😂。 <a class="header-anchor" href="#至此-网站从http改为https-有效期为1年😂。" aria-hidden="true">#</a></h2>',7),c=[i];function r(C,A,h,d,y,_){return a(),n("div",null,c)}const u=s(o,[["render",r]]);export{D as __pageData,u as default};
