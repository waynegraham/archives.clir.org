---
layout: none
---
<pre>
RewriteEngine On
{% for redirect in site.data.reports %}
Redirect Temporary {{ redirect.current_url }} {{ redirect.new_url }} 
{% endfor %}
</pre>