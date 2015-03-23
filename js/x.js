var X={};_.extend(X,{Navigate:function(n,t){if(n!=Backbone.history.getFragment())t=$.extend({},{trigger:!1},t||{}),X.String.StartsWith(n,"/")?n="/"+n:X.String.StartsWith(n,"//")||(n="//"+n),Backbone.history.navigate(n,t)},Throw:function(n){var t=Array.prototype.slice.call(arguments,1);console.log(n,t);throw n;},Themes:{Current:"Base"}}),X.Aggregator=_.extend({},Backbone.Events),X.Browser={GetInternetExplorerVersion:function(){var n=-1,t,i;return navigator.appName=="Microsoft Internet Explorer"&&(t=navigator.userAgent,i=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"),i.exec(t)!=null&&(n=parseFloat(RegExp.$1))),n}},X.Const={BaseArea:"Home",BigImageWidth:1200,MediumImageWidth:600,SmallImageWidth:300,ThumbnailWidth:320,ThumbnailHeight:200,ImagesExt:["jpg","jpeg","jpe","png"],OriPicPrefix:"o-",BigPicPrefix:"b-",MedPicPrefix:"m-",SmallPicPrefix:"s-",ThumbnailPrefix:"t-"},_.extend(X.Const,{ThumbnailRatio:function(){return X.Const.ThumbnailWidth/X.Const.ThumbnailHeight}(),Headers:{TableOrder:"TableOrd"},Cookie:{HeaderCollapse:"HeaderCollapse",SectionCollapse:"SectionClp",TableOrder:"TableOrd",ColumnsPosition:"ColumnsPos",TableResults:"TableRes",TablePage:"TablePag",LangEdit:"LangEdit",FitToHeight:"FitToHeight",TableDisplay:"TableDisplay",ColumnsVisibility:"ColumnsVis",LoggedUser:"PRGU",Locale:"UIC"}}),X.Cookie={Get:function(n){var t,r,u,i=document.cookie.split(";");for(t=0,l=i.length;t<l;t++)if(r=i[t].substr(0,i[t].indexOf("=")),u=i[t].substr(i[t].indexOf("=")+1),r=r.replace(/^\s+|\s+$/g,""),r==n)return unescape(u)},GetAll:function(){var r={},n,t,u,i=document.cookie.split(";");for(n=0,l=i.length;n<l;n++)t=i[n].substr(0,i[n].indexOf("=")),u=i[n].substr(i[n].indexOf("=")+1),t=t.replace(/^\s+|\s+$/g,""),t&&(r[t]=unescape(u));return r},Set:function(n,t){var i=new Date;i.setFullYear(i.getFullYear()+1),document.cookie=n+"="+t+";path=/;expires="+i.toGMTString()},Delete:function(n){var t=new Date;t.setFullYear(t.getFullYear()-1),document.cookie=n+"=;path=/;expires="+t.toGMTString()},DeleteAll:function(){var n=this.GetAll();for(x in n)this.Delete(x)}},X.String={Empty:"",Format:function(n){var t=Array.prototype.slice.call(arguments,1);return n.replace(/{(\d+)}/g,function(n,i){return typeof t[i]!="undefined"?t[i]:n})},Contains:function(n,t){if(typeof t=="string"||typeof t=="number")return n.indexOf(t)!=-1;if(t instanceof RegExp)return n.search(t)!=-1;throw"Invalid use of [X.String.Contains]";},EndsWith:function(n,t,i){return i=arguments[2]||!1,i?n.toLowerCase().indexOf(t.toLowerCase(),n.length-t.length)!==-1:n.indexOf(t,n.length-t.length)!==-1},StartsWith:function(n,t,i){return i=arguments[2]||!1,i?n.substr(0,t.length).toLowerCase()==t.toLowerCase():n.substr(0,t.length)==t},IsNumberRepresentation:function(n){return/^[\-|\+]?[0-9\s\,\.]+$/.test(n)},ToNumberString:function(n,t,i){return t=arguments[1]||",",i=arguments[2]||".",n=n.replace(/\s/g,""),t!=" "&&(n=n.replace(new RegExp("\\"+t,"g"),"")),n.replace(i,".")},ToNumber:function(n,t,i){return new Number(X.String.ToNumberString(n,t,i))},IsGuid:function(n){return/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(n)},RemoveLeftSpaces:function(n){return n.replace(/^[\s]+/g,"")},RemoveRightSpaces:function(n){return n.replace(/[\s]+$/g,"")},Trim:function(n){return n.replace(/^[\s]+|[\s]+$/g,"")},RemoveSpaces:function(n){return n.replace(/\s/g,"")},RemoveMultipleSpaces:function(n){return n.replace(/\s{2,}/g," ")},EncForWeb:function(n){return n?typeof n!="string"?n:n.replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""},ZeroFill:function(n,t){for(_.isString(n)||(n=n.toString());n.length<t;)n="0"+n;return n},Repeat:function(n,t){return new Array(t+1).join(n)},BreakWords:function(n,t){if(!n)return n;t||(t=50);var i=n.match(new RegExp("([^\\s]{1,"+t+"})","g"));return i?i.join(" "):n},GetCharacters:function(n){var r=[],t,i;for(n||(n=600),t=0;t<n;t++)i=String.fromCharCode(t),i&&r.push(i);return r},GetRandomChar:function(n){n||(n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");var t=Math.floor(Math.random()*n.length);return n.substring(t,t+1)},Builder:function(){this.Lines=[],this.Append=function(n){this.Lines.push(n)},this.AppendFormat=function(n){var t=Array.prototype.slice.call(arguments,1);this.Append(n.replace(/{(\d+)}/g,function(n,i){return typeof t[i]!="undefined"?t[i]:n}))},this.ToString=function(){return this.Lines.join("")}},RemoveHiphens:function(n){return n.replace(/-(.)/g,function(n,t){return t.toUpperCase()})}},X.Number={AreValid:function(n){for(var t=0;t<n.length;t++)if(!this.IsValid(n[t]))return!1;return!0},IsValid:function(n){return _.isNumber(n)&&!isNaN(n)&&isFinite(n)},Format:function(n,t){var o,l,r,u,s,a,e,h;if(!n)return"0";var c=X.Common.GetLanguage(),v={numberSeparator:c.Number.NumberGroupSeparator,decimalSeparator:c.Number.NumberDecimalSeparator,numberScale:2,addDecimals:!0},i=$.extend(v,t||{}),f="";for(/^[\+\-]?\d+\.\d{1,2}$/.test(n)&&i.decimalSeparator!="."&&(f=i.decimalSeparator,i.decimalSeparator="."),/^[\+\-]?\d+\,\d{1,2}$/.test(n)&&i.decimalSeparator!=","&&(f=i.decimalSeparator,i.decimalSeparator=","),n+="",n=n.replace(/\s/g,""),n=n.replace(/^0+/,""),i.numberSeparator!=i.decimalSeparator&&(n=n.replace(new RegExp("\\"+i.numberSeparator,"g"),"")),X.String.StartsWith(n,i.decimalSeparator)&&(n="0"+n),o=n.substring(0,1),l=/[\+|\-]/.test(o),n=n.replace(/[\+|\-]/g,""),r=n.split(i.decimalSeparator),u=r[0],r.length>1&&r[1].length>i.numberScale&&(s=new Number("0."+r[1]).toFixed(i.numberScale),r[1]=s<1?s.toString().replace("0.",""):"99"),i.addDecimals&&r.length==1&&r.push("00"),i.addDecimals&&r.length>1&&r[1].length==1&&(r[1]=r[1]+"0"),a=f?f:i.decimalSeparator,e=r.length>1?a+r[1]:"",e==i.decimalSeparator&&(e+="00"),h=/(\d+)(\d{3})/;h.test(u);)u=u.replace(h,"$1"+i.numberSeparator+"$2");return(l?o:"")+(u||"0")+e},Within:function(n,t,i){return n<t?t:n>i?i:n},ParseMoney:function(n){return X.Number.Parse(n)},ToNumberString:function(n,t,i){return t=arguments[1]||",",i=arguments[2]||".",n=n.replace(/\s/g,""),t!=" "&&(n=n.replace(new RegExp("\\"+t,"g"),"")),n.replace(i,".")},Parse:function(n,t,i){if(arguments.length==1){var r=X.Common.GetLanguage();t=r.Number.NumberGroupSeparator,i=r.Number.NumberDecimalSeparator}return parseFloat(X.Number.ToNumberString(n,t,i))}},X.Array={Contains:function(n,t){return this.IndexOf(n,t)>-1},Clone:function(n){for(var i=[],t=0;t<n.length;t++)n[t]instanceof Array?i.push(this.Clone(n[t])):i.push(_.clone(n[t]));return i},IndexOf:function(n,t){return _.indexOf(n,t)},Pick:function(n){return n[Math.floor(Math.random()*n.length)]},PickDistinct:function(n,t){for(var i=this.Pick(n);_.contains(t,i);)i=this.Pick(n);return i},PickArray:function(n,t){if(t>n.length)throw"going to stack overflow";for(var i=[],r;t;)(r=X.Array.Pick(n),_.contains(i,r))||(i.push(r),t--);return i},Remove:function(n,t,i){if(!n instanceof Array)throw"[X.Array.Remove] - argument is not an array.";var r=n.slice((i||t)+1||n.length);return n.length=t<0?n.length+t:t,n.push.apply(n,r)},GetObjectsByValues:function(n,t,i){var u,f,r,e;if(!n instanceof Array)throw"[X.Extensions.GetObjectsByValues] - argument[0] is not an array.";if(typeof t!="object")throw"[X.Extensions.GetObjectsByValues] - argument[1] is not an object.";if(u=X.Object.CountProperties(t),!u)throw"[X.Extensions.GetObjectsByValues] - argument[1] is an empty object.";for(f=[],r=0;r<n.length;r++){e=0;for(x in t)n[r][x]===t[x]&&e++;if(e==u&&(f.push(n[r]),i))break}return f},SortByProperty:function(n,t,i){n.sort(function(n,r){var u=n[t],f=r[t];if(typeof n[t]=="string"&&typeof r[t]=="string"&&(u=n[t].toLowerCase(),f=r[t].toLowerCase()),i.toLowerCase()=="ascending"||i.toLowerCase()=="asc"){if(u<f)return-1;if(u>f)return 1}else{if(u<f)return 1;if(u>f)return-1}return 0})},SortNumericArray:function(n){return n.sort(function(n,t){return n<t?-1:n>t?1:0}),n},ValuesToString:function(n){var i,t;if(!n)return[];for(i=[],t=0;t<n.length;t++)i.push(n[t].toString());return i},GetDictionaryValues:function(n){if(!_.isObject(n))throw"[X.Array.GetDictionaryValues] argument is not an object.";var t=[];for(x in n)t.push(n[x]);return t},DictionaryToPairs:function(n,t){if(!_.isObject(n))throw"[X.Array.GetDictionaryValues] argument is not an object.";_.isBoolean(t)||(t=!0);var i=[];for(x in n)i.push({key:x,value:n[x]});return t&&X.Array.SortByProperty(i,"value","asc"),i},In:function(n,t){return t.indexOf(n)!=-1},GetValues:function(n,t){for(var r=[],i=0;i<t.length;i++)t[i][n]&&r.push(t[i][n]);return r},Filter:function(n,t){for(var r=[],i=0;i<n.length;i++)for(x in t)_.isArray(t[x])&&t[x].indexOf(n[i][x])!=-1&&r.push(n[i]),_.isFunction(t[x])&&t[x](n[i])&&r.push(n[i]);return r},GetMinimumTickIndex:function(n,t){if(n=this.SortNumericArray(n),t>n[n.length-1])return n.length-1;for(var i=0;i<n.length-1&&t>=n[i];)i++;return i},Select:function(n,t){for(var r=[],i=0;i<n.length;i++)t(n[i],i)&&r.push(n[i]);return r},MakeUnique:function(n,t,i,r,u){return _.isBoolean(u)||(u=!0),_.map(n,function(n){return n[r]=n[t]===i?u:!u,n})}},X.Object={Pick:function(n){return n[X.Array.Pick(_.keys(n))]},Extend:function(n,t){var r=this,i,u;return i=n&&_.has(n,"constructor")?n.constructor:function(){return r.apply(this,arguments)},_.extend(i,r,t),u=function(){this.constructor=i},u.prototype=r.prototype,i.prototype=new u,n&&_.extend(i.prototype,n),i.__super__=r.prototype,i},Define:function(n,t){for(var r=n.split("."),t=t||window,i=0;i<r.length;i+=1)t[r[i]]||(t[r[i]]={}),t=t[r[i]];return t},IsDefined:function(n,t){if(!n)throw"missing namespace";t||(t=window);for(var i=n.split(".");p=i.shift();)if(t.hasOwnProperty(p))t=t[p];else return!1;return!0},Read:function(n,t){t||(t=window);for(var r=n.split("."),i;p=r.shift();)t.hasOwnProperty(p)&&(i=t[p]);return i},CountProperties:function(n){var t=0;for(x in n)t++;return t},Clone:function(n){var t,r,i,u;if(typeof n=="object")if(n instanceof Array)for(r=[],i=0,u=n.length;i<u;i++)r[i]=this.Clone(n[i]);else{r={};for(t in n)if(typeof n[t]=="object")if(n[t]instanceof Array)for(r[t]=[],i=0,u=n[t].length;i<u;i++)r[t][i]=this.Clone(n[t][i]);else r[t]=this.Clone(n[t]);else r[t]=n[t]}else r=n;return r},EnsurePropertyName:function(n,t){while(n.hasOwnProperty(t))t="_"+t;return t},GetPropertyValue:function(n,t){for(var r=t.split("."),i=n,u;u=r.shift();)if(i.hasOwnProperty(u)&&(i=i[u]),i instanceof Array)break;return i instanceof Array?r.length?this.GetCollectionPropertiesValue(i,r.join(".")):i:i},GetCollectionPropertiesValue:function(n,t,i){var s,u,f,r,e,o;if(!t)return n;for(typeof i!="boolean"&&(i=!0),s=t.split("."),u=[],f=0;f<n.length;f++){if(r=n[f],!r.hasOwnProperty(s[0])){i&&u.push(null);continue}r instanceof Array?(e=this.GetCollectionPropertiesValue(r,name),(i||e.length)&&u.push(e)):typeof r=="object"?(o=this.getPropertyValue(r,name),(i||this.HasValue(o))&&u.push(o)):(i||this.HasValue(r))&&u.push(r)}return u},HasValue:function(n){return n?n instanceof Array?!!n.length:!0:!1},IsNumber:function(n){return!isNaN(parseFloat(n))&&isFinite(n)},IterateProperties:function(n,t){for(x in n)t(n[x])},GetSchema:function(n){var t,i={};for(t in n)i[t]={type:typeof n[t],isArray:n[t]instanceof Array,name:t};return i}},X.Event={StopDefault:function(n,t){n=n||w.e,n.preDefault?n.preDefault():n.returnValue=!1,t&&(n.stopPropagation?n.stopPropagation():n.cancelBubble=!0)},GetMousePosition:function(n){return{x:this.GetMouseX(n),y:this.GetMouseY(n)}},GetMouseClickAbsolutePosition:function(n){return{x:n.pageX,y:n.pageY}},GetMouseClickRelativePosition:function(n){var t=$(n.target).parent().offset();return{x:n.pageX-t.left,y:n.pageY-t.top}},GetMouseX:function(n){return n.pageX?n.pageX:n.clientX?n.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft):0},GetMouseY:function(n){return n.pageY?n.pageY:n.clientY?n.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop):0},GetEventKeyCode:function(n){return n.keyCode?n.keyCode:n.charCode},EnterWasClicked:function(n){return this.GetEventKeyCode(n)==this.Key.enter},Key:{tab:9,enter:13,shift:16,ctrl:17,alt:18,capsLock:20,escape:27,esc:27,pageUp:33,pageDown:34,end:35,beginning:36,left:37,top:38,right:39,down:40,windows:91}},X.Function={Try:function(n){try{return n(),!0}catch(t){return!1}},Queue:{},FirstWins:function(n,t,i,r){if(_.isNumber(i)||(i=500),_.isString(t)||X.Throw("[X.Function.FirstWins] Missing key for FirstWins definition."),!this.Queue[t]){this.Queue[t]=!0;var u=this;setTimeout(function(){delete u.Queue[t]},i),n.apply(r,[])}},LastWins:function(n,t,i,r){_.isNumber(i)||(i=500),_.isString(t)||X.Throw("[X.Function.LastWins] Missing key for LastWins definition.");var u=this;this.Queue[t]&&clearTimeout(this.Queue[t]),this.Queue[t]=setTimeout(function(){n.apply(r,[])},i)},Chain:function(n){n=_.map(n,function(n){return _.isFunction(n)?{fn:n,params:[]}:n});var i=0,t=[],f=_.toArray(arguments).slice(1,arguments.length),u={success:function(n){n&&n.error?(t.push(n),r.resolve(t)):(t.push(n),r.notify())},failure:function(n){n.statusText&&n.statusText.toLowerCase()!="ok"?(t.push({error:!0,message:I18n.t("Errors.OperationError")}),X.Message.Fail({title:I18n.t("Errors.Sorry"),message:I18n.t("Errors.SystemErrorOccurred")})):t.push(n),r.resolve(t)}},r=(new $.Deferred).progress(function(){i++,i==n.length?r.resolve(t):n[i].fn.apply(null,f.concat(n[i].params)).then(u.success,u.failure)});return n.length?n[i].fn.apply(null,f.concat(n[i].params)).then(u.success,u.failure):r.resolve(t),r}},X.Date={Parse:function(n){var i,t;if(!n)return new Date;if(i=/^\/Date\((-?\d+)\)\/$/i,t=i.exec(n),t)return new Date(parseInt(n.replace(i,"$1")));n=X.String.Trim(n);var r=X.Common.GetLanguage(),u=r.Date.DateTimeFormat,f=r.Date.LongDateTimeFormat;return(i=/^(\d{1,2})[\/|-](\d{1,2})[\/|-](\d{4})\s(\d{1,2})\:(\d{1,2})\:(\d{1,2})$/,t=i.exec(n),t)?X.Date.FromMatch(t,f):(i=/^(\d{1,2})[\/|-](\d{1,2})[\/|-](\d{4})(?:\s(\d{1,2})\:?(\d{1,2})?)?$/,t=i.exec(n),t)?X.Date.FromMatch(t,u):I18n.parseDate(n)},ToString:function(n){if(!n)return"";var t=X.Common.GetLanguage(),i=t.Date.DateTimeFormat;return X.String.Format(i,n.getFullYear(),X.String.ZeroFill(n.getMonth()+1,2),X.String.ZeroFill(n.getDate(),2),X.String.ZeroFill(n.getHours(),2),X.String.ZeroFill(n.getMinutes(),2))},GetTime:function(){var n=new Date;return X.String.Format("{0}:{1}:{2}",n.getHours(),n.getMinutes(),n.getSeconds())},FromMatch:function(n,t){var i=t.match(/({\d})/g),r;if(!i)throw"invalid format";return i.unshift(0),r={year:parseInt(n[i.indexOf("{0}")]),month:parseInt(n[i.indexOf("{1}")]),day:parseInt(n[i.indexOf("{2}")]),hour:n[4]?parseInt(n[i.indexOf("{3}")]):0,minute:n[5]?parseInt(n[i.indexOf("{4}")]):0,second:n[6]?parseInt(n[i.indexOf("{5}")]):0},new Date(r.year,r.month-1,r.day,r.hour,r.minute,r.second)}},X.Time={EraseTimeout:function(n){clearTimeout(n),n=null},EraseInterval:function(n){clearInterval(n),n=null},GetExpression:function(n,t){return(n==0||n>1)&&(t=t+"s"),X.String.Format("{0} {1}",n,I18n.t("Date.Units."+t))}},X.Image={ResImage:function(n){this.el=n;var t=X.Window.GetSize;this.imageRatio=function(){return this.el.height/this.el.width},this.offsetRatio=function(){return this.el.offsetParent.offsetHeight/this.el.offsetParent.offsetWidth},this.parentRatio=function(){return this.el.parentNode.offsetHeight/this.el.parentNode.offsetWidth},this.resizeToWidth=function(){this.el.width=t("x")},this.resizeToHeight=function(){this.el.height=t("y")}}},X.Common={RefreshPage:function(){Backbone.history.loadUrl(Backbone.history.fragment)},GetPageCount:function(n,t){return n>t?n%t==0?n/t:Math.ceil(n/t):1},GetLanguage:function(){var n=I18n.translations[I18n.locale];if(!n)throw"I18n: locale language has not been initialized!";if(!n.Number)throw"I18n: define number format CultureInfo inside i18n file for: "+I18n.locale;return n},GetEditLanguageId:function(){return X.Cookie.Get(X.Const.Cookie.LangEdit)||1},GetText:function(n,t){if(!n)return"";var i=t?X.String.Format("{0}.{1}",t,n):n;return I18n.lookup(i)?I18n.t(i):n},HasDictionaries:function(n){if(!X.Dictionaries)return!1;typeof n=="string"&&(n=[n]);for(var t=0;t<n.length;t++)if(!X.Dictionaries.hasOwnProperty(n[t]))return!1;return!0},GetDictionary:function(n){if(!X.Dictionaries)throw"[X.Common.GetDictionaries]: X.Dictionaries not initialized";if(!_.isString(n))throw"[X.Common.GetDictionaries]: argument[0] is not a string";for(x in X.Dictionaries)if(n==x)return X.Dictionaries[x];return null},GetDictionaries:function(n){if(!_.isArray(n))throw"[X.Common.GetDictionaries]: arguments[0] is not an Array";if(!X.Dictionaries)throw"[X.Common.GetDictionaries]: X.Dictionaries not initialized";var t=[];return _.each(n,function(n){X.Dictionaries[n]&&t.push(X.Dictionaries[n])}),t},RequireParams:function(n,t){var r,i;if(!n)throw"[Missing required object]";for(r=[],i=0;i<t.length;i++)n.hasOwnProperty(t[i])||r.push(t[i]);if(r.length)throw X.String.Format("[Missing Required Parameters] {0}",r.join(", "));},GetBigPictureHeight:function(n,t){return Math.ceil(t/(n/X.Const.BigImageWidth))},GetMediumPictureHeight:function(n,t){return Math.ceil(t/(n/X.Const.MediumImageWidth))},GetHtmlResponseTitle:function(n){if(!n)return"";var t=n.match(/<\btitle\b>([\w\W]*?)<\/\btitle\b>/);return t?t[1]:""},User:function(){this.Name="",this.Roles=[],this.IsInRole=function(n){if(_.isString(n))return _.contains(this.Roles,n);if(_.isArray(n)){for(var t=0;t<n.length;t++)if(!_.contains(this.Roles,n[t]))return!1;return!0}};var n=X.Cookie.Get(X.Const.Cookie.LoggedUser);n&&(n=n.split("|"),this.Name=n.shift(),this.Roles=n,this.Authenticated=!0)},AuthObj:function(){throw"NotImplemented";},Facebook:{}},X.Elements={IndexAmongElements:function(n,t){for(var i=0;i<t.length;i++)if(n===t[i])return i;return-1},FindPos:function(n){var t=0;if(n.offsetParent){do t+=n.offsetTop;while(n=n.offsetParent);return[t]}}},X.Arithmetic={GetRelativeWidth:function(n,t,i){var r=i/t;return Math.ceil(r*n)},GetRelativeHeight:function(n,t,i){var r=i/n;return Math.ceil(r*t)}},X.Themes={Current:"Base"},X.Window={GetSize:function(n){var t,i;return(window.innerWidth?(t=window.innerWidth,i=window.innerHeight):document.documentElement&&document.documentElement.clientWidth?(t=document.documentElement.clientWidth,i=document.documentElement.clientHeight):(t=document.getElementsByTagName("body")[0].clientWidth,i=document.getElementsByTagName("body")[0].clientHeight),!n)?{w:t,h:i}:n=="x"?t:n=="y"?i:void 0}},X.Serializer={Pipe:function(n){var t=[];for(x in n)t.push(X.String.Format("{0}:{1}",escape(x),escape(n[x])));return t.join("|")},DePipe:function(n){for(var r={},u=n.split("|"),i,t=0;t<u.length;t++)i=u[t].split(":"),r[unescape(i[0])]=unescape(i[1]);return r},GetColonInfo:function(n){var t,i;return n?(t=n.match(/\b([\w]+):([^\s]+)/g),t)?(i={},_.each(t,function(n){var t=n.split(":");i[t[0]]=t[1]}),i):{}:{}}},X.Color={componentToHex:function(n){var t=n.toString(16);return t.length==1?"0"+t:t},rgbToHex:function(n,t,i,r){return r==undefined?"#"+this.componentToHex(n)+this.componentToHex(t)+this.componentToHex(i):r===!0?"#"+this.componentToHex(n)+this.componentToHex(t)+this.componentToHex(i)+"FF":"#"+this.componentToHex(n)+this.componentToHex(t)+this.componentToHex(i)+this.componentToHex(r)},hexToRgb:function(n){var n=n.replace(/^#?([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])([a-fA-F\d])?$/i,function(n,t,i,r,u){return t+t+i+i+r+r+(u?u+u:"")}),t=/^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})?$/i.exec(n);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),a:t[4]?parseInt(t[4],16):255}:null}},X.Backbone={ModelMultipleSet:function(n,t,i){_.isUndefined(i)&&(i=!1);var r;for(r in t)n.set(r,t[r],{silent:i})}},X.Page={Refresh:function(){Backbone.history.loadUrl(Backbone.history.fragment)}}

//deprecated:
delete X.Aggregator;
delete X.Theme;
delete X.Common.User;
//select cookie constant for selected theme
X.Const.Cookie.Theme = 'PRTHEME';

/*
	Add:
	X.Page.Refresh
*/

X.Paths = {
	Theme: '/styles',
	Images: '/images'
};
X.Event.Key.up = X.Event.Key.top;
X.Theme = {
	Swap: function (theme) {
		if (!_.contains(this.Themes, theme)) throw 'theme not supported';
		var body = $('body');
		if (body.hasClass(theme)) return;
		body.removeClass(this.Themes.join(' ')).addClass(theme);
		X.Cookie.Set(X.Const.Cookie.Theme, theme);
	},
	Themes: [
		'clear',
		'dark',
		'bronze',
		'olive',
		'phthalogreen',
		'ultramarine',
		'midnight'
	]
};

X.Number.GetOrder = function (order) {
	if (_.isNumber(order)) return order;
	if (!order || order.toLowerCase() == 'ascending' || order.toLowerCase() == 'asc') {
		return 1; 
	}
	return -1;
};

//compares two strings in a better way
X.String.Compare = function (a, b, order, options) {
	order = X.Number.GetOrder(order);
	if (a && !b) return order;
	if (!a && b) return -order;
	if (!a && !b) return 0;
	if (a == b) return 0;
	
	var def = {
		alphabet: 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻAąbcćdeęfghijklłmnńoóprsśtuwyzźż',
		caseSensitive: false
	},
		o = $.extend(def, options || {}),
		c = o.caseSensitive ? a : a.toLowerCase(),
		d =  o.caseSensitive ? b : b.toLowerCase(),
		pos = 0,
		min = Math.min(a.length, b.length);

	if (c == d) return 0;
		
	while (c.charAt(pos) === d.charAt(pos) && pos < min) { pos++; }
	var cPos = o.alphabet.indexOf(c.charAt(pos)),
			dPos = o.alphabet.indexOf(d.charAt(pos));
	
	if (cPos > -1 && dPos > -1)
		return cPos > dPos ? order : -order;
		
	//one of the two is not a letter
	return c < d ? -order : order;
	return 0;
};

X.Event.WasElementClicked = function (e, element) {
	if (element.attr) {
		element = element.get(0);
	}
	if (e.target === element) return true;
	return jQuery.contains(element, e.target);
};

X.Array.SortByProperty = function (arr, property, order) {
	order = X.Number.GetOrder(order);
	arr.sort(function (a, b) {
		var c = a[property], d = b[property];
		if (c && !d) return order;
		if (!c && d) return -order;
		
		if (typeof a[property] == 'string' && typeof b[property] == 'string') {
			return X.String.Compare(c, d, order);
		}

		if (c < d) return -order;
		if (c > d) return order;
		return 0;
	});
};

X.Array.SortByStringProperty = function (arr, property, order, options) {
	throw 'obsolete';
	//'ABCDEFGHIJKLMNOPQRSTUVWXYZaàâäbcçdeéèêëfghiïîjklmnñoôöpqrstuûüvwxyÿz'
	var def = {
		alphabet: 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻAąbcćdeęfghijklłmnńoóprsśtuwyzźż'
	};
	var o = $.extend(def, options || {});
	arr.sort(function (a, b) {
		var c = a[property].toLowerCase(), 
			d = b[property].toLowerCase(),
			cPos = o.alphabet.indexOf(c),
			dPos = o.alphabet.indexOf(d);

		//are both letters?
		if (cPos != -1 && dPos != -1) {
			//both 
			if (order.toLowerCase() == 'ascending' || order.toLowerCase() == 'asc') {
			
			}
		}
			
		if (order.toLowerCase() == 'ascending' || order.toLowerCase() == 'asc') {
			if (c < d) return -1;
			if (c > d) return 1;
		} else {
			if (c < d) return 1;
			if (c > d) return -1;
		}
		return 0;
	});
}