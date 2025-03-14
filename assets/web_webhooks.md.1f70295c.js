import{_ as s,c as n,o as a,d as l}from"./app.18b2d180.js";const e="/webhooks.png",p="/create_wh.png",o="/end_wh.png",g=JSON.parse('{"title":"WebHooks的使用介绍","description":"","frontmatter":{},"headers":[{"level":2,"title":"关键词","slug":"关键词","link":"#关键词","children":[]},{"level":2,"title":"步骤","slug":"步骤","link":"#步骤","children":[]},{"level":2,"title":"至此，这套简易版的前端自动化部署也就完成了。","slug":"至此-这套简易版的前端自动化部署也就完成了。","link":"#至此-这套简易版的前端自动化部署也就完成了。","children":[]}],"relativePath":"web/webhooks.md"}'),c={name:"web/webhooks.md"},t=l('<h1 id="webhooks的使用介绍" tabindex="-1">WebHooks的使用介绍 <a class="header-anchor" href="#webhooks的使用介绍" aria-hidden="true">#</a></h1><blockquote><p>基于webhooks和widows服务器的前端自动更新工具 基于gitee的wehooks实现自动化操作，等于gitee给一个接口发送Post请求，然后在函数内部执行一些操作，比如拉去代码、发送消息等。</p></blockquote><img src="'+e+'"><h2 id="关键词" tabindex="-1">关键词 <a class="header-anchor" href="#关键词" aria-hidden="true">#</a></h2><p>webhooks 7777 node</p><h2 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-hidden="true">#</a></h2><ol><li><p>获取webhooks的配置信息，勾选push事件触发</p><ul><li>在gitee上获取配置信息，包含一个url和密钥。 <img src="'+p+`"></li></ul></li><li><p>基于nodejs写一个API接口</p><ul><li>引入需要使用到的包：http、gitee-webhook-handler、child_process</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">var http = require(&quot;http&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">var child_process = require(&quot;child_process&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">var createHandler = require(&quot;gitee-webhook-handler&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>配置密钥和请求URL</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 这里的/webhook对应上面url中的/webhook secret为上面配置的</span></span>
<span class="line"><span style="color:#A6ACCD;">var handler = createHandler({</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &quot;/webhookUrl&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    secret: &quot;1234&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>使用nodejs的http服务实现一个简易的post请求，默认是7777端口</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">http.createServer(function (req, res) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    handler(req, res, function (err) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        res.statusCode = 404;</span></span>
<span class="line"><span style="color:#A6ACCD;">        res.end(&quot;no such location&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">}).listen(7777);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>监听git push事件</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;"> //  监听的是Push事件</span></span>
<span class="line"><span style="color:#A6ACCD;"> handler.on(&quot;Push Hook&quot;, function (event) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     console.log(&#39;发生 push 事件了&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">     console.log(event.payload.repository.name, event.payload.ref);</span></span>
<span class="line"><span style="color:#A6ACCD;">     console.log(new Date())</span></span>
<span class="line"><span style="color:#A6ACCD;">     startPullCode()</span></span>
<span class="line"><span style="color:#A6ACCD;"> });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>实现自动更新代码</p><ul><li><p>基于windows服务器，我写了2个bat脚本，如果是linux服务器，则写对应的sh脚本</p></li><li><p>获取代码，需要服务器配置好git环境</p></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">    @echo off</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    cd C:\\zhouwen\\zdzw</span></span>
<span class="line"><span style="color:#A6ACCD;">    git pull origin master</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @echo off</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo pull code success</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>复制dist文件至nginx</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">    @echo off</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    echo del start </span></span>
<span class="line"><span style="color:#A6ACCD;">    del /f /s /q &quot;C:\\zhouwen\\nginx\\html\\*.*&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    rd /s /q &quot;C:\\zhouwen\\nginx\\html\\assets&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo del success</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    echo copy start</span></span>
<span class="line"><span style="color:#A6ACCD;">    xcopy /e/y/r  C:\\zhouwen\\zdzw\\dist &quot;C:\\zhouwen\\nginx\\html&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo copy success</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @echo off</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo update code success</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>使用child_process.execFile执行逻辑脚本</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">//执行获取代码脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">function startPullCode() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        child_process.execFile(</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;pullcode.bat&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">        null, </span></span>
<span class="line"><span style="color:#A6ACCD;">        { cwd: &#39;C:/zhouwen/webhooks&#39;},</span></span>
<span class="line"><span style="color:#A6ACCD;">        function (error, stdout, stderr) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (error !== null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(&quot;exec error&quot; + error)</span></span>
<span class="line"><span style="color:#A6ACCD;">            }else{ </span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(&quot;拉取代码 成功 &quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">                console.log(new Date())</span></span>
<span class="line"><span style="color:#A6ACCD;">                setTimeout(function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">                    startDeploy()</span></span>
<span class="line"><span style="color:#A6ACCD;">                }, 10000)</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>拉去代码需要时间，所以做10s延迟执行第二个部署脚本</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">//部署代码</span></span>
<span class="line"><span style="color:#A6ACCD;">function startDeploy() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    child_process.execFile(</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;deploy.bat&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    null,</span></span>
<span class="line"><span style="color:#A6ACCD;">    { cwd: &#39;C:/zhouwen/webhooks&#39; },</span></span>
<span class="line"><span style="color:#A6ACCD;">    function (error, stdout, stderr) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (error !== null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&quot;exec error&quot; + error)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }else{ </span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&quot;复制代码到 nginx 成功&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(new Date())</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>部署到服务器上，当有代码git push到仓库时，便会执行对应的脚本了。 <img src="`+o+'"></p></li></ol><h2 id="至此-这套简易版的前端自动化部署也就完成了。" tabindex="-1">至此，这套简易版的前端自动化部署也就完成了。 <a class="header-anchor" href="#至此-这套简易版的前端自动化部署也就完成了。" aria-hidden="true">#</a></h2>',8),i=[t];function r(C,A,u,d,h,y){return a(),n("div",null,i)}const b=s(c,[["render",r]]);export{g as __pageData,b as default};
