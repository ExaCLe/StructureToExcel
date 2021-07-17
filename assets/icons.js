const icons = [
  { name: "add", key: " 61696" },

  { name: "airplane", key: " 61702" },

  { name: "alarm", key: " 61705" },

  { name: "albums", key: " 61708" },

  { name: "alert", key: " 61711" },

  { name: "american-football", key: " 61717" },

  { name: "analytics", key: " 61720" },

  { name: "aperture", key: " 61723" },

  { name: "apps", key: " 61726" },

  { name: "archive", key: " 61729" },

  { name: "arrow-back", key: " 61732" },

  { name: "arrow-down", key: " 61738" },

  { name: "arrow-forward", key: " 61744" },

  { name: "arrow-redo", key: " 61750" },

  { name: "arrow-undo", key: " 61756" },

  { name: "arrow-up", key: " 61762" },

  { name: "at", key: " 61768" },

  { name: "attach", key: " 61774" },

  { name: "backspace", key: " 61777" },

  { name: "bandage", key: " 61780" },

  { name: "bar-chart", key: " 61783" },

  { name: "barbell", key: " 61786" },

  { name: "barcode", key: " 61789" },

  { name: "baseball", key: " 61792" },

  { name: "basket", key: " 61795" },

  { name: "basketball", key: " 61798" },

  { name: "battery-charging", key: " 61801" },

  { name: "battery-dead", key: " 61804" },

  { name: "battery-full", key: " 61807" },

  { name: "battery-half", key: " 61810" },

  { name: "beaker", key: " 61813" },

  { name: "bed", key: " 61816" },

  { name: "beer", key: " 61819" },

  { name: "bicycle", key: " 61822" },

  { name: "bluetooth", key: " 61825" },

  { name: "boat", key: " 61828" },

  { name: "body", key: " 61831" },

  { name: "bonfire", key: " 61834" },

  { name: "book", key: " 61837" },

  { name: "bookmark", key: " 61840" },

  { name: "bookmarks", key: " 61843" },

  { name: "briefcase", key: " 61846" },

  { name: "browsers", key: " 61849" },

  { name: "brush", key: " 61852" },

  { name: "bug", key: " 61855" },

  { name: "build", key: " 61858" },

  { name: "bulb", key: " 61861" },

  { name: "bus", key: " 61864" },

  { name: "business", key: " 61867" },

  { name: "cafe", key: " 61870" },

  { name: "calculator", key: " 61873" },

  { name: "calendar", key: " 61876" },

  { name: "call", key: " 61879" },

  { name: "camera", key: " 61882" },

  { name: "camera-reverse", key: " 61884" },

  { name: "car", key: " 61888" },

  { name: "car-sport", key: " 61891" },

  { name: "card", key: " 61894" },

  { name: "caret-back", key: " 61897" },

  { name: "caret-down", key: " 61903" },

  { name: "caret-forward", key: " 61909" },

  { name: "caret-up", key: " 61915" },

  { name: "cart", key: " 61921" },

  { name: "cash", key: " 61924" },

  { name: "cellular", key: " 61927" },

  { name: "chatbox", key: " 61930" },
  { name: "chatbox-ellipses", key: " 61931" },

  { name: "chatbubble", key: " 61936" },
  { name: "chatbubble-ellipses", key: " 61937" },

  { name: "chatbubbles", key: " 61942" },

  { name: "checkbox", key: " 61945" },

  { name: "checkmark", key: " 61948" },

  { name: "checkmark-done", key: " 61952" },

  { name: "chevron-back", key: " 61960" },

  { name: "chevron-down", key: " 61966" },

  { name: "chevron-forward", key: " 61972" },

  { name: "chevron-up", key: " 61978" },

  { name: "clipboard", key: " 61984" },

  { name: "close", key: " 61987" },

  { name: "cloud", key: " 61993" },

  { name: "cloud-done", key: " 61997" },

  { name: "cloud-download", key: " 62000" },

  { name: "cloud-offline", key: " 62003" },

  { name: "cloud-upload", key: " 62008" },

  { name: "cloudy", key: " 62011" },
  { name: "cloudy-night", key: " 62012" },

  { name: "code", key: " 62017" },
  { name: "code-download", key: " 62018" },

  { name: "code-slash", key: " 62023" },

  { name: "code-working", key: " 62026" },

  { name: "cog", key: " 62029" },

  { name: "color-fill", key: " 62032" },

  { name: "color-filter", key: " 62035" },

  { name: "color-palette", key: " 62038" },

  { name: "color-wand", key: " 62041" },

  { name: "compass", key: " 62044" },

  { name: "construct", key: " 62047" },

  { name: "contract", key: " 62050" },

  { name: "contrast", key: " 62053" },

  { name: "copy", key: " 62056" },

  { name: "create", key: " 62059" },

  { name: "crop", key: " 62062" },

  { name: "cube", key: " 62065" },

  { name: "cut", key: " 62068" },

  { name: "desktop", key: " 62071" },

  { name: "disc", key: " 62074" },

  { name: "document", key: " 62077" },
  { name: "document-attach", key: " 62078" },

  { name: "document-text", key: " 62083" },

  { name: "documents", key: " 62086" },

  { name: "download", key: " 62089" },

  { name: "duplicate", key: " 62092" },

  { name: "ear", key: " 62095" },

  { name: "earth", key: " 62098" },

  { name: "easel", key: " 62101" },

  { name: "egg", key: " 62104" },

  { name: "ellipse", key: " 62107" },

  { name: "ellipsis-horizontal", key: " 62110" },

  { name: "ellipsis-vertical", key: " 62116" },

  { name: "enter", key: " 62122" },

  { name: "exit", key: " 62125" },

  { name: "expand", key: " 62128" },

  { name: "eye", key: " 62131" },
  { name: "eye-off", key: " 62132" },

  { name: "eyedrop", key: " 62137" },

  { name: "fast-food", key: " 62140" },

  { name: "female", key: " 62143" },

  { name: "file-tray", key: " 62146" },
  { name: "file-tray-full", key: " 62147" },

  { name: "file-tray-stacked", key: " 62152" },

  { name: "film", key: " 62155" },

  { name: "filter", key: " 62158" },

  { name: "finger-print", key: " 62161" },

  { name: "fitness", key: " 62164" },

  { name: "flag", key: " 62167" },

  { name: "flame", key: " 62170" },

  { name: "flash", key: " 62173" },
  { name: "flash-off", key: " 62174" },

  { name: "flashlight", key: " 62179" },

  { name: "flask", key: " 62182" },

  { name: "flower", key: " 62185" },

  { name: "folder", key: " 62188" },
  { name: "folder-open", key: " 62189" },

  { name: "football", key: " 62194" },

  { name: "funnel", key: " 62197" },

  { name: "game-controller", key: " 62200" },

  { name: "gift", key: " 62203" },

  { name: "git-branch", key: " 62206" },

  { name: "git-commit", key: " 62209" },

  { name: "git-compare", key: " 62212" },

  { name: "git-merge", key: " 62215" },

  { name: "git-network", key: " 62218" },

  { name: "git-pull-request", key: " 62221" },

  { name: "glasses", key: " 62224" },

  { name: "globe", key: " 62227" },

  { name: "golf", key: " 62230" },

  { name: "grid", key: " 62233" },

  { name: "hammer", key: " 62236" },

  { name: "hand-left", key: " 62239" },

  { name: "hand-right", key: " 62242" },

  { name: "happy", key: " 62245" },

  { name: "hardware-chip", key: " 62248" },

  { name: "headset", key: " 62251" },

  { name: "heart", key: " 62254" },

  { name: "heart-dislike", key: " 62258" },

  { name: "heart-half", key: " 62264" },

  { name: "help", key: " 62269" },
  { name: "help-buoy", key: " 62270" },

  { name: "home", key: " 62278" },

  { name: "hourglass", key: " 62281" },

  { name: "ice-cream", key: " 62284" },

  { name: "image", key: " 62287" },

  { name: "images", key: " 62290" },

  { name: "infinite", key: " 62293" },

  { name: "information", key: " 62296" },

  { name: "journal", key: " 62302" },

  { name: "key", key: " 62305" },

  { name: "keypad", key: " 62308" },

  { name: "language", key: " 62311" },

  { name: "laptop", key: " 62314" },

  { name: "layers", key: " 62317" },

  { name: "leaf", key: " 62320" },

  { name: "library", key: " 62323" },

  { name: "link", key: " 62326" },

  { name: "list", key: " 62329" },

  { name: "locate", key: " 62335" },

  { name: "location", key: " 62338" },

  { name: "lock-closed", key: " 62341" },

  { name: "lock-open", key: " 62344" },

  { name: "log-in", key: " 62347" },

  { name: "log-out", key: " 62350" },

  { name: "logo-amazon", key: " 62353" },
  { name: "logo-amplify", key: " 62354" },
  { name: "logo-android", key: " 62355" },
  { name: "logo-angular", key: " 62356" },
  { name: "logo-apple", key: " 62357" },
  { name: "logo-apple-appstore", key: " 62358" },
  { name: "logo-bitbucket", key: " 62359" },
  { name: "logo-bitcoin", key: " 62360" },
  { name: "logo-buffer", key: " 62361" },
  { name: "logo-capacitor", key: " 62362" },
  { name: "logo-chrome", key: " 62363" },
  { name: "logo-closed-captioning", key: " 62364" },
  { name: "logo-codepen", key: " 62365" },
  { name: "logo-css3", key: " 62366" },
  { name: "logo-designernews", key: " 62367" },
  { name: "logo-dribbble", key: " 62368" },
  { name: "logo-dropbox", key: " 62369" },
  { name: "logo-edge", key: " 62370" },
  { name: "logo-electron", key: " 62371" },
  { name: "logo-euro", key: " 62372" },
  { name: "logo-facebook", key: " 62373" },
  { name: "logo-firebase", key: " 62374" },
  { name: "logo-firefox", key: " 62375" },
  { name: "logo-flickr", key: " 62376" },
  { name: "logo-foursquare", key: " 62377" },
  { name: "logo-github", key: " 62378" },
  { name: "logo-google", key: " 62379" },
  { name: "logo-google-playstore", key: " 62380" },
  { name: "logo-hackernews", key: " 62381" },
  { name: "logo-html5", key: " 62382" },
  { name: "logo-instagram", key: " 62383" },
  { name: "logo-ionic", key: " 62384" },
  { name: "logo-ionitron", key: " 62385" },
  { name: "logo-javascript", key: " 62386" },
  { name: "logo-laravel", key: " 62387" },
  { name: "logo-linkedin", key: " 62388" },
  { name: "logo-markdown", key: " 62389" },
  { name: "logo-no-smoking", key: " 62390" },
  { name: "logo-nodejs", key: " 62391" },
  { name: "logo-npm", key: " 62392" },
  { name: "logo-octocat", key: " 62393" },
  { name: "logo-pinterest", key: " 62394" },
  { name: "logo-playstation", key: " 62395" },
  { name: "logo-pwa", key: " 62396" },
  { name: "logo-python", key: " 62397" },
  { name: "logo-react", key: " 62398" },
  { name: "logo-reddit", key: " 62399" },
  { name: "logo-rss", key: " 62400" },
  { name: "logo-sass", key: " 62401" },
  { name: "logo-skype", key: " 62402" },
  { name: "logo-slack", key: " 62403" },
  { name: "logo-snapchat", key: " 62404" },
  { name: "logo-stackoverflow", key: " 62405" },
  { name: "logo-steam", key: " 62406" },
  { name: "logo-stencil", key: " 62407" },
  { name: "logo-tumblr", key: " 62408" },
  { name: "logo-tux", key: " 62409" },
  { name: "logo-twitch", key: " 62410" },
  { name: "logo-twitter", key: " 62411" },
  { name: "logo-usd", key: " 62412" },
  { name: "logo-vimeo", key: " 62413" },
  { name: "logo-vk", key: " 62414" },
  { name: "logo-vue", key: " 62415" },
  { name: "logo-web-component", key: " 62416" },
  { name: "logo-whatsapp", key: " 62417" },
  { name: "logo-windows", key: " 62418" },
  { name: "logo-wordpress", key: " 62419" },
  { name: "logo-xbox", key: " 62420" },
  { name: "logo-xing", key: " 62421" },
  { name: "logo-yahoo", key: " 62422" },
  { name: "logo-yen", key: " 62423" },
  { name: "logo-youtube", key: " 62424" },
  { name: "magnet", key: " 62425" },

  { name: "mail", key: " 62428" },
  { name: "mail-open", key: " 62429" },

  { name: "mail-unread", key: " 62434" },

  { name: "male", key: " 62437" },
  { name: "male-female", key: " 62438" },

  { name: "man", key: " 62443" },

  { name: "map", key: " 62446" },

  { name: "medal", key: " 62449" },

  { name: "medical", key: " 62452" },

  { name: "medkit", key: " 62455" },

  { name: "megaphone", key: " 62458" },

  { name: "menu", key: " 62461" },

  { name: "mic", key: " 62464" },

  { name: "mic-off", key: " 62468" },

  { name: "moon", key: " 62476" },

  { name: "move", key: " 62479" },

  { name: "musical-note", key: " 62482" },

  { name: "musical-notes", key: " 62485" },

  { name: "navigate", key: " 62488" },

  { name: "newspaper", key: " 62494" },

  { name: "notifications", key: " 62497" },

  { name: "notifications-off", key: " 62501" },

  { name: "nuclear", key: " 62509" },

  { name: "nutrition", key: " 62512" },

  { name: "open", key: " 62515" },

  { name: "options", key: " 62518" },

  { name: "paper-plane", key: " 62521" },

  { name: "partly-sunny", key: " 62524" },

  { name: "pause", key: " 62527" },

  { name: "paw", key: " 62533" },

  { name: "pencil", key: " 62536" },

  { name: "people", key: " 62539" },

  { name: "person", key: " 62545" },
  { name: "person-add", key: " 62546" },

  { name: "person-remove", key: " 62553" },

  { name: "phone-landscape", key: " 62557" },

  { name: "phone-portrait", key: " 62560" },

  { name: "pie-chart", key: " 62563" },

  { name: "pin", key: " 62566" },

  { name: "pint", key: " 62569" },

  { name: "pizza", key: " 62572" },

  { name: "planet", key: " 62575" },

  { name: "play", key: " 62578" },
  { name: "play-back", key: " 62579" },

  { name: "play-forward", key: " 62588" },

  { name: "play-skip-back", key: " 62596" },

  { name: "play-skip-forward", key: " 62602" },

  { name: "podium", key: " 62608" },

  { name: "power", key: " 62611" },

  { name: "pricetag", key: " 62614" },

  { name: "pricetags", key: " 62617" },

  { name: "print", key: " 62620" },

  { name: "pulse", key: " 62623" },

  { name: "push", key: " 62626" },

  { name: "qr-code", key: " 62629" },

  { name: "radio", key: " 62632" },
  { name: "radio-button-off", key: " 62633" },

  { name: "radio-button-on", key: " 62636" },

  { name: "rainy", key: " 62641" },

  { name: "reader", key: " 62644" },

  { name: "receipt", key: " 62647" },

  { name: "recording", key: " 62650" },

  { name: "refresh", key: " 62653" },

  { name: "reload", key: " 62659" },

  { name: "remove", key: " 62665" },

  { name: "reorder-four", key: " 62671" },

  { name: "reorder-three", key: " 62674" },

  { name: "reorder-two", key: " 62677" },

  { name: "repeat", key: " 62680" },

  { name: "resize", key: " 62683" },

  { name: "restaurant", key: " 62686" },

  { name: "return-down-back", key: " 62689" },

  { name: "return-down-forward", key: " 62692" },

  { name: "return-up-back", key: " 62695" },

  { name: "return-up-forward", key: " 62698" },

  { name: "ribbon", key: " 62701" },

  { name: "rocket", key: " 62704" },

  { name: "rose", key: " 62707" },

  { name: "sad", key: " 62710" },

  { name: "save", key: " 62713" },

  { name: "scan", key: " 62716" },

  { name: "school", key: " 62722" },

  { name: "search", key: " 62725" },

  { name: "send", key: " 62731" },

  { name: "server", key: " 62734" },

  { name: "settings", key: " 62737" },

  { name: "shapes", key: " 62740" },

  { name: "share", key: " 62743" },

  { name: "share-social", key: " 62746" },

  { name: "shield", key: " 62749" },
  { name: "shield-checkmark", key: " 62750" },

  { name: "shirt", key: " 62755" },

  { name: "shuffle", key: " 62758" },

  { name: "skull", key: " 62761" },

  { name: "snow", key: " 62764" },

  { name: "speedometer", key: " 62767" },

  { name: "square", key: " 62770" },

  { name: "star", key: " 62773" },
  { name: "star-half", key: " 62774" },

  { name: "stats-chart", key: " 62779" },

  { name: "stop", key: " 62782" },

  { name: "stopwatch", key: " 62788" },

  { name: "subway", key: " 62791" },

  { name: "sunny", key: " 62794" },

  { name: "swap-horizontal", key: " 62797" },

  { name: "swap-vertical", key: " 62800" },

  { name: "sync", key: " 62803" },

  { name: "tablet-landscape", key: " 62809" },

  { name: "tablet-portrait", key: " 62812" },

  { name: "tennisball", key: " 62815" },

  { name: "terminal", key: " 62818" },

  { name: "text", key: " 62821" },

  { name: "thermometer", key: " 62824" },

  { name: "thumbs-down", key: " 62827" },

  { name: "thumbs-up", key: " 62830" },

  { name: "thunderstorm", key: " 62833" },

  { name: "time", key: " 62836" },

  { name: "timer", key: " 62839" },

  { name: "today", key: " 62842" },

  { name: "toggle", key: " 62845" },

  { name: "trail-sign", key: " 62848" },

  { name: "train", key: " 62851" },

  { name: "transgender", key: " 62854" },

  { name: "trash", key: " 62857" },
  { name: "trash-bin", key: " 62858" },

  { name: "trending-down", key: " 62863" },

  { name: "trending-up", key: " 62866" },

  { name: "triangle", key: " 62869" },

  { name: "trophy", key: " 62872" },

  { name: "tv", key: " 62875" },

  { name: "umbrella", key: " 62878" },

  { name: "videocam", key: " 62881" },

  { name: "volume-high", key: " 62884" },

  { name: "volume-low", key: " 62887" },

  { name: "volume-medium", key: " 62890" },

  { name: "volume-mute", key: " 62893" },

  { name: "volume-off", key: " 62896" },

  { name: "walk", key: " 62899" },

  { name: "wallet", key: " 62902" },

  { name: "warning", key: " 62905" },

  { name: "watch", key: " 62908" },

  { name: "water", key: " 62911" },

  { name: "wifi", key: " 62914" },

  { name: "wine", key: " 62917" },

  { name: "woman", key: " 62920" },

  { name: "ios-add", key: " 61696" },

  { name: "ios-airplane", key: " 61702" },

  { name: "ios-alarm", key: " 61705" },

  { name: "ios-albums", key: " 61708" },

  { name: "ios-alert", key: " 61711" },

  { name: "ios-american-football", key: " 61717" },

  { name: "ios-analytics", key: " 61720" },

  { name: "ios-aperture", key: " 61723" },

  { name: "ios-apps", key: " 61726" },

  { name: "ios-archive", key: " 61729" },

  { name: "ios-arrow-back", key: " 61732" },

  { name: "ios-arrow-down", key: " 61738" },

  { name: "ios-arrow-forward", key: " 61744" },

  { name: "ios-arrow-redo", key: " 61750" },

  { name: "ios-arrow-undo", key: " 61756" },

  { name: "ios-arrow-up", key: " 61762" },

  { name: "ios-at", key: " 61768" },

  { name: "ios-attach", key: " 61774" },

  { name: "ios-backspace", key: " 61777" },

  { name: "ios-bandage", key: " 61780" },

  { name: "ios-bar-chart", key: " 61783" },

  { name: "ios-barbell", key: " 61786" },

  { name: "ios-barcode", key: " 61789" },

  { name: "ios-baseball", key: " 61792" },

  { name: "ios-basket", key: " 61795" },

  { name: "ios-basketball", key: " 61798" },

  { name: "ios-battery-charging", key: " 61801" },

  { name: "ios-battery-dead", key: " 61804" },

  { name: "ios-battery-full", key: " 61807" },

  { name: "ios-battery-half", key: " 61810" },

  { name: "ios-beaker", key: " 61813" },

  { name: "ios-bed", key: " 61816" },

  { name: "ios-beer", key: " 61819" },

  { name: "ios-bicycle", key: " 61822" },

  { name: "ios-bluetooth", key: " 61825" },

  { name: "ios-boat", key: " 61828" },

  { name: "ios-body", key: " 61831" },

  { name: "ios-bonfire", key: " 61834" },

  { name: "ios-book", key: " 61837" },

  { name: "ios-bookmark", key: " 61840" },

  { name: "ios-bookmarks", key: " 61843" },

  { name: "ios-briefcase", key: " 61846" },

  { name: "ios-browsers", key: " 61849" },

  { name: "ios-brush", key: " 61852" },

  { name: "ios-bug", key: " 61855" },

  { name: "ios-build", key: " 61858" },

  { name: "ios-bulb", key: " 61861" },

  { name: "ios-bus", key: " 61864" },

  { name: "ios-business", key: " 61867" },

  { name: "ios-cafe", key: " 61870" },

  { name: "ios-calculator", key: " 61873" },

  { name: "ios-calendar", key: " 61876" },

  { name: "ios-call", key: " 61879" },

  { name: "ios-camera", key: " 61882" },

  { name: "ios-camera-reverse", key: " 61884" },

  { name: "ios-car", key: " 61888" },

  { name: "ios-car-sport", key: " 61891" },

  { name: "ios-card", key: " 61894" },

  { name: "ios-caret-back", key: " 61897" },

  { name: "ios-caret-down", key: " 61903" },

  { name: "ios-caret-forward", key: " 61909" },

  { name: "ios-caret-up", key: " 61915" },

  { name: "ios-cart", key: " 61921" },

  { name: "ios-cash", key: " 61924" },

  { name: "ios-cellular", key: " 61927" },

  { name: "ios-chatbox", key: " 61930" },
  { name: "ios-chatbox-ellipses", key: " 61931" },

  { name: "ios-chatbubble", key: " 61936" },
  { name: "ios-chatbubble-ellipses", key: " 61937" },

  { name: "ios-chatbubbles", key: " 61942" },

  { name: "ios-checkbox", key: " 61945" },

  { name: "ios-checkmark", key: " 61948" },

  { name: "ios-checkmark-done", key: " 61952" },

  { name: "ios-chevron-back", key: " 61960" },

  { name: "ios-chevron-down", key: " 61966" },

  { name: "ios-chevron-forward", key: " 61972" },

  { name: "ios-chevron-up", key: " 61978" },

  { name: "ios-clipboard", key: " 61984" },

  { name: "ios-close", key: " 61987" },

  { name: "ios-cloud", key: " 61993" },

  { name: "ios-cloud-done", key: " 61997" },

  { name: "ios-cloud-download", key: " 62000" },

  { name: "ios-cloud-offline", key: " 62003" },

  { name: "ios-cloud-upload", key: " 62008" },

  { name: "ios-cloudy", key: " 62011" },
  { name: "ios-cloudy-night", key: " 62012" },

  { name: "ios-code", key: " 62017" },
  { name: "ios-code-download", key: " 62018" },

  { name: "ios-code-slash", key: " 62023" },

  { name: "ios-code-working", key: " 62026" },

  { name: "ios-cog", key: " 62029" },

  { name: "ios-color-fill", key: " 62032" },

  { name: "ios-color-filter", key: " 62035" },

  { name: "ios-color-palette", key: " 62038" },

  { name: "ios-color-wand", key: " 62041" },

  { name: "ios-compass", key: " 62044" },

  { name: "ios-construct", key: " 62047" },

  { name: "ios-contract", key: " 62050" },

  { name: "ios-contrast", key: " 62053" },

  { name: "ios-copy", key: " 62056" },

  { name: "ios-create", key: " 62059" },

  { name: "ios-crop", key: " 62062" },

  { name: "ios-cube", key: " 62065" },

  { name: "ios-cut", key: " 62068" },

  { name: "ios-desktop", key: " 62071" },

  { name: "ios-disc", key: " 62074" },

  { name: "ios-document", key: " 62077" },
  { name: "ios-document-attach", key: " 62078" },

  { name: "ios-document-text", key: " 62083" },

  { name: "ios-documents", key: " 62086" },

  { name: "ios-download", key: " 62089" },

  { name: "ios-duplicate", key: " 62092" },

  { name: "ios-ear", key: " 62095" },

  { name: "ios-earth", key: " 62098" },

  { name: "ios-easel", key: " 62101" },

  { name: "ios-egg", key: " 62104" },

  { name: "ios-ellipse", key: " 62107" },

  { name: "ios-ellipsis-horizontal", key: " 62110" },

  { name: "ios-ellipsis-vertical", key: " 62116" },

  { name: "ios-enter", key: " 62122" },

  { name: "ios-exit", key: " 62125" },

  { name: "ios-expand", key: " 62128" },

  { name: "ios-eye", key: " 62131" },
  { name: "ios-eye-off", key: " 62132" },

  { name: "ios-eyedrop", key: " 62137" },

  { name: "ios-fast-food", key: " 62140" },

  { name: "ios-female", key: " 62143" },

  { name: "ios-file-tray", key: " 62146" },
  { name: "ios-file-tray-full", key: " 62147" },

  { name: "ios-file-tray-stacked", key: " 62152" },

  { name: "ios-film", key: " 62155" },

  { name: "ios-filter", key: " 62158" },

  { name: "ios-finger-print", key: " 62161" },

  { name: "ios-fitness", key: " 62164" },

  { name: "ios-flag", key: " 62167" },

  { name: "ios-flame", key: " 62170" },

  { name: "ios-flash", key: " 62173" },
  { name: "ios-flash-off", key: " 62174" },

  { name: "ios-flashlight", key: " 62179" },

  { name: "ios-flask", key: " 62182" },

  { name: "ios-flower", key: " 62185" },

  { name: "ios-folder", key: " 62188" },
  { name: "ios-folder-open", key: " 62189" },

  { name: "ios-football", key: " 62194" },

  { name: "ios-funnel", key: " 62197" },

  { name: "ios-game-controller", key: " 62200" },

  { name: "ios-gift", key: " 62203" },

  { name: "ios-git-branch", key: " 62206" },

  { name: "ios-git-commit", key: " 62209" },

  { name: "ios-git-compare", key: " 62212" },

  { name: "ios-git-merge", key: " 62215" },

  { name: "ios-git-network", key: " 62218" },

  { name: "ios-git-pull-request", key: " 62221" },

  { name: "ios-glasses", key: " 62224" },

  { name: "ios-globe", key: " 62227" },

  { name: "ios-golf", key: " 62230" },

  { name: "ios-grid", key: " 62233" },

  { name: "ios-hammer", key: " 62236" },

  { name: "ios-hand-left", key: " 62239" },

  { name: "ios-hand-right", key: " 62242" },

  { name: "ios-happy", key: " 62245" },

  { name: "ios-hardware-chip", key: " 62248" },

  { name: "ios-headset", key: " 62251" },

  { name: "ios-heart", key: " 62254" },

  { name: "ios-heart-dislike", key: " 62258" },

  { name: "ios-heart-half", key: " 62264" },

  { name: "ios-help", key: " 62269" },
  { name: "ios-help-buoy", key: " 62270" },

  { name: "ios-home", key: " 62278" },

  { name: "ios-hourglass", key: " 62281" },

  { name: "ios-ice-cream", key: " 62284" },

  { name: "ios-image", key: " 62287" },

  { name: "ios-images", key: " 62290" },

  { name: "ios-infinite", key: " 62293" },

  { name: "ios-information", key: " 62296" },

  { name: "ios-journal", key: " 62302" },

  { name: "ios-key", key: " 62305" },

  { name: "ios-keypad", key: " 62308" },

  { name: "ios-language", key: " 62311" },

  { name: "ios-laptop", key: " 62314" },

  { name: "ios-layers", key: " 62317" },

  { name: "ios-leaf", key: " 62320" },

  { name: "ios-library", key: " 62323" },

  { name: "ios-link", key: " 62326" },

  { name: "ios-list", key: " 62329" },

  { name: "ios-locate", key: " 62335" },

  { name: "ios-location", key: " 62338" },

  { name: "ios-lock-closed", key: " 62341" },

  { name: "ios-lock-open", key: " 62344" },

  { name: "ios-log-in", key: " 62347" },

  { name: "ios-log-out", key: " 62350" },

  { name: "ios-logo-amazon", key: " 62353" },
  { name: "ios-logo-amplify", key: " 62354" },
  { name: "ios-logo-android", key: " 62355" },
  { name: "ios-logo-angular", key: " 62356" },
  { name: "ios-logo-apple", key: " 62357" },
  { name: "ios-logo-apple-appstore", key: " 62358" },
  { name: "ios-logo-bitbucket", key: " 62359" },
  { name: "ios-logo-bitcoin", key: " 62360" },
  { name: "ios-logo-buffer", key: " 62361" },
  { name: "ios-logo-capacitor", key: " 62362" },
  { name: "ios-logo-chrome", key: " 62363" },
  { name: "ios-logo-closed-captioning", key: " 62364" },
  { name: "ios-logo-codepen", key: " 62365" },
  { name: "ios-logo-css3", key: " 62366" },
  { name: "ios-logo-designernews", key: " 62367" },
  { name: "ios-logo-dribbble", key: " 62368" },
  { name: "ios-logo-dropbox", key: " 62369" },
  { name: "ios-logo-edge", key: " 62370" },
  { name: "ios-logo-electron", key: " 62371" },
  { name: "ios-logo-euro", key: " 62372" },
  { name: "ios-logo-facebook", key: " 62373" },
  { name: "ios-logo-firebase", key: " 62374" },
  { name: "ios-logo-firefox", key: " 62375" },
  { name: "ios-logo-flickr", key: " 62376" },
  { name: "ios-logo-foursquare", key: " 62377" },
  { name: "ios-logo-github", key: " 62378" },
  { name: "ios-logo-google", key: " 62379" },
  { name: "ios-logo-google-playstore", key: " 62380" },
  { name: "ios-logo-hackernews", key: " 62381" },
  { name: "ios-logo-html5", key: " 62382" },
  { name: "ios-logo-instagram", key: " 62383" },
  { name: "ios-logo-ionic", key: " 62384" },
  { name: "ios-logo-ionitron", key: " 62385" },
  { name: "ios-logo-javascript", key: " 62386" },
  { name: "ios-logo-laravel", key: " 62387" },
  { name: "ios-logo-linkedin", key: " 62388" },
  { name: "ios-logo-markdown", key: " 62389" },
  { name: "ios-logo-no-smoking", key: " 62390" },
  { name: "ios-logo-nodejs", key: " 62391" },
  { name: "ios-logo-npm", key: " 62392" },
  { name: "ios-logo-octocat", key: " 62393" },
  { name: "ios-logo-pinterest", key: " 62394" },
  { name: "ios-logo-playstation", key: " 62395" },
  { name: "ios-logo-pwa", key: " 62396" },
  { name: "ios-logo-python", key: " 62397" },
  { name: "ios-logo-react", key: " 62398" },
  { name: "ios-logo-reddit", key: " 62399" },
  { name: "ios-logo-rss", key: " 62400" },
  { name: "ios-logo-sass", key: " 62401" },
  { name: "ios-logo-skype", key: " 62402" },
  { name: "ios-logo-slack", key: " 62403" },
  { name: "ios-logo-snapchat", key: " 62404" },
  { name: "ios-logo-stackoverflow", key: " 62405" },
  { name: "ios-logo-steam", key: " 62406" },
  { name: "ios-logo-stencil", key: " 62407" },
  { name: "ios-logo-tumblr", key: " 62408" },
  { name: "ios-logo-tux", key: " 62409" },
  { name: "ios-logo-twitch", key: " 62410" },
  { name: "ios-logo-twitter", key: " 62411" },
  { name: "ios-logo-usd", key: " 62412" },
  { name: "ios-logo-vimeo", key: " 62413" },
  { name: "ios-logo-vk", key: " 62414" },
  { name: "ios-logo-vue", key: " 62415" },
  { name: "ios-logo-web-component", key: " 62416" },
  { name: "ios-logo-whatsapp", key: " 62417" },
  { name: "ios-logo-windows", key: " 62418" },
  { name: "ios-logo-wordpress", key: " 62419" },
  { name: "ios-logo-xbox", key: " 62420" },
  { name: "ios-logo-xing", key: " 62421" },
  { name: "ios-logo-yahoo", key: " 62422" },
  { name: "ios-logo-yen", key: " 62423" },
  { name: "ios-logo-youtube", key: " 62424" },
  { name: "ios-magnet", key: " 62425" },

  { name: "ios-mail", key: " 62428" },
  { name: "ios-mail-open", key: " 62429" },

  { name: "ios-mail-unread", key: " 62434" },

  { name: "ios-male", key: " 62437" },
  { name: "ios-male-female", key: " 62438" },

  { name: "ios-man", key: " 62443" },

  { name: "ios-map", key: " 62446" },

  { name: "ios-medal", key: " 62449" },

  { name: "ios-medical", key: " 62452" },

  { name: "ios-medkit", key: " 62455" },

  { name: "ios-megaphone", key: " 62458" },

  { name: "ios-menu", key: " 62461" },

  { name: "ios-mic", key: " 62464" },

  { name: "ios-mic-off", key: " 62468" },

  { name: "ios-moon", key: " 62476" },

  { name: "ios-move", key: " 62479" },

  { name: "ios-musical-note", key: " 62482" },

  { name: "ios-musical-notes", key: " 62485" },

  { name: "ios-navigate", key: " 62488" },

  { name: "ios-newspaper", key: " 62494" },

  { name: "ios-notifications", key: " 62497" },

  { name: "ios-notifications-off", key: " 62501" },

  { name: "ios-nuclear", key: " 62509" },

  { name: "ios-nutrition", key: " 62512" },

  { name: "ios-open", key: " 62515" },

  { name: "ios-options", key: " 62518" },

  { name: "ios-paper-plane", key: " 62521" },

  { name: "ios-partly-sunny", key: " 62524" },

  { name: "ios-pause", key: " 62527" },

  { name: "ios-paw", key: " 62533" },

  { name: "ios-pencil", key: " 62536" },

  { name: "ios-people", key: " 62539" },

  { name: "ios-person", key: " 62545" },
  { name: "ios-person-add", key: " 62546" },

  { name: "ios-person-remove", key: " 62553" },

  { name: "ios-phone-landscape", key: " 62557" },

  { name: "ios-phone-portrait", key: " 62560" },

  { name: "ios-pie-chart", key: " 62563" },

  { name: "ios-pin", key: " 62566" },

  { name: "ios-pint", key: " 62569" },

  { name: "ios-pizza", key: " 62572" },

  { name: "ios-planet", key: " 62575" },

  { name: "ios-play", key: " 62578" },
  { name: "ios-play-back", key: " 62579" },

  { name: "ios-play-forward", key: " 62588" },

  { name: "ios-play-skip-back", key: " 62596" },

  { name: "ios-play-skip-forward", key: " 62602" },

  { name: "ios-podium", key: " 62608" },

  { name: "ios-power", key: " 62611" },

  { name: "ios-pricetag", key: " 62614" },

  { name: "ios-pricetags", key: " 62617" },

  { name: "ios-print", key: " 62620" },

  { name: "ios-pulse", key: " 62623" },

  { name: "ios-push", key: " 62626" },

  { name: "ios-qr-code", key: " 62629" },

  { name: "ios-radio", key: " 62632" },
  { name: "ios-radio-button-off", key: " 62633" },

  { name: "ios-radio-button-on", key: " 62636" },

  { name: "ios-rainy", key: " 62641" },

  { name: "ios-reader", key: " 62644" },

  { name: "ios-receipt", key: " 62647" },

  { name: "ios-recording", key: " 62650" },

  { name: "ios-refresh", key: " 62653" },

  { name: "ios-reload", key: " 62659" },

  { name: "ios-remove", key: " 62665" },

  { name: "ios-reorder-four", key: " 62671" },

  { name: "ios-reorder-three", key: " 62674" },

  { name: "ios-reorder-two", key: " 62677" },

  { name: "ios-repeat", key: " 62680" },

  { name: "ios-resize", key: " 62683" },

  { name: "ios-restaurant", key: " 62686" },

  { name: "ios-return-down-back", key: " 62689" },

  { name: "ios-return-down-forward", key: " 62692" },

  { name: "ios-return-up-back", key: " 62695" },

  { name: "ios-return-up-forward", key: " 62698" },

  { name: "ios-ribbon", key: " 62701" },

  { name: "ios-rocket", key: " 62704" },

  { name: "ios-rose", key: " 62707" },

  { name: "ios-sad", key: " 62710" },

  { name: "ios-save", key: " 62713" },

  { name: "ios-scan", key: " 62716" },

  { name: "ios-school", key: " 62722" },

  { name: "ios-search", key: " 62725" },

  { name: "ios-send", key: " 62731" },

  { name: "ios-server", key: " 62734" },

  { name: "ios-settings", key: " 62737" },

  { name: "ios-shapes", key: " 62740" },

  { name: "ios-share", key: " 62743" },

  { name: "ios-share-social", key: " 62746" },

  { name: "ios-shield", key: " 62749" },
  { name: "ios-shield-checkmark", key: " 62750" },

  { name: "ios-shirt", key: " 62755" },

  { name: "ios-shuffle", key: " 62758" },

  { name: "ios-skull", key: " 62761" },

  { name: "ios-snow", key: " 62764" },

  { name: "ios-speedometer", key: " 62767" },

  { name: "ios-square", key: " 62770" },

  { name: "ios-star", key: " 62773" },
  { name: "ios-star-half", key: " 62774" },

  { name: "ios-stats-chart", key: " 62779" },

  { name: "ios-stop", key: " 62782" },

  { name: "ios-stopwatch", key: " 62788" },

  { name: "ios-subway", key: " 62791" },

  { name: "ios-sunny", key: " 62794" },

  { name: "ios-swap-horizontal", key: " 62797" },

  { name: "ios-swap-vertical", key: " 62800" },

  { name: "ios-sync", key: " 62803" },

  { name: "ios-tablet-landscape", key: " 62809" },

  { name: "ios-tablet-portrait", key: " 62812" },

  { name: "ios-tennisball", key: " 62815" },

  { name: "ios-terminal", key: " 62818" },

  { name: "ios-text", key: " 62821" },

  { name: "ios-thermometer", key: " 62824" },

  { name: "ios-thumbs-down", key: " 62827" },

  { name: "ios-thumbs-up", key: " 62830" },

  { name: "ios-thunderstorm", key: " 62833" },

  { name: "ios-time", key: " 62836" },

  { name: "ios-timer", key: " 62839" },

  { name: "ios-today", key: " 62842" },

  { name: "ios-toggle", key: " 62845" },

  { name: "ios-trail-sign", key: " 62848" },

  { name: "ios-train", key: " 62851" },

  { name: "ios-transgender", key: " 62854" },

  { name: "ios-trash", key: " 62857" },
  { name: "ios-trash-bin", key: " 62858" },

  { name: "ios-trending-down", key: " 62863" },

  { name: "ios-trending-up", key: " 62866" },

  { name: "ios-triangle", key: " 62869" },

  { name: "ios-trophy", key: " 62872" },

  { name: "ios-tv", key: " 62875" },

  { name: "ios-umbrella", key: " 62878" },

  { name: "ios-videocam", key: " 62881" },

  { name: "ios-volume-high", key: " 62884" },

  { name: "ios-volume-low", key: " 62887" },

  { name: "ios-volume-medium", key: " 62890" },

  { name: "ios-volume-mute", key: " 62893" },

  { name: "ios-volume-off", key: " 62896" },

  { name: "ios-walk", key: " 62899" },

  { name: "ios-wallet", key: " 62902" },

  { name: "ios-warning", key: " 62905" },

  { name: "ios-watch", key: " 62908" },

  { name: "ios-water", key: " 62911" },

  { name: "ios-wifi", key: " 62914" },

  { name: "ios-wine", key: " 62917" },

  { name: "ios-woman", key: " 62920" },

  { name: "md-add", key: " 61696" },

  { name: "md-airplane", key: " 61702" },

  { name: "md-alarm", key: " 61705" },

  { name: "md-albums", key: " 61708" },

  { name: "md-alert", key: " 61711" },

  { name: "md-american-football", key: " 61717" },

  { name: "md-analytics", key: " 61720" },

  { name: "md-aperture", key: " 61723" },

  { name: "md-apps", key: " 61726" },

  { name: "md-archive", key: " 61729" },

  { name: "md-arrow-back", key: " 61732" },

  { name: "md-arrow-down", key: " 61738" },

  { name: "md-arrow-forward", key: " 61744" },

  { name: "md-arrow-redo", key: " 61750" },

  { name: "md-arrow-undo", key: " 61756" },

  { name: "md-arrow-up", key: " 61762" },

  { name: "md-at", key: " 61768" },

  { name: "md-attach", key: " 61774" },

  { name: "md-backspace", key: " 61777" },

  { name: "md-bandage", key: " 61780" },

  { name: "md-bar-chart", key: " 61783" },

  { name: "md-barbell", key: " 61786" },

  { name: "md-barcode", key: " 61789" },

  { name: "md-baseball", key: " 61792" },

  { name: "md-basket", key: " 61795" },

  { name: "md-basketball", key: " 61798" },

  { name: "md-battery-charging", key: " 61801" },

  { name: "md-battery-dead", key: " 61804" },

  { name: "md-battery-full", key: " 61807" },

  { name: "md-battery-half", key: " 61810" },

  { name: "md-beaker", key: " 61813" },

  { name: "md-bed", key: " 61816" },

  { name: "md-beer", key: " 61819" },

  { name: "md-bicycle", key: " 61822" },

  { name: "md-bluetooth", key: " 61825" },

  { name: "md-boat", key: " 61828" },

  { name: "md-body", key: " 61831" },

  { name: "md-bonfire", key: " 61834" },

  { name: "md-book", key: " 61837" },

  { name: "md-bookmark", key: " 61840" },

  { name: "md-bookmarks", key: " 61843" },

  { name: "md-briefcase", key: " 61846" },

  { name: "md-browsers", key: " 61849" },

  { name: "md-brush", key: " 61852" },

  { name: "md-bug", key: " 61855" },

  { name: "md-build", key: " 61858" },

  { name: "md-bulb", key: " 61861" },

  { name: "md-bus", key: " 61864" },

  { name: "md-business", key: " 61867" },

  { name: "md-cafe", key: " 61870" },

  { name: "md-calculator", key: " 61873" },

  { name: "md-calendar", key: " 61876" },

  { name: "md-call", key: " 61879" },

  { name: "md-camera", key: " 61882" },

  { name: "md-camera-reverse", key: " 61884" },

  { name: "md-car", key: " 61888" },

  { name: "md-car-sport", key: " 61891" },

  { name: "md-card", key: " 61894" },

  { name: "md-caret-back", key: " 61897" },

  { name: "md-caret-down", key: " 61903" },

  { name: "md-caret-forward", key: " 61909" },

  { name: "md-caret-up", key: " 61915" },

  { name: "md-cart", key: " 61921" },

  { name: "md-cash", key: " 61924" },

  { name: "md-cellular", key: " 61927" },

  { name: "md-chatbox", key: " 61930" },
  { name: "md-chatbox-ellipses", key: " 61931" },

  { name: "md-chatbubble", key: " 61936" },
  { name: "md-chatbubble-ellipses", key: " 61937" },

  { name: "md-chatbubbles", key: " 61942" },

  { name: "md-checkbox", key: " 61945" },

  { name: "md-checkmark", key: " 61948" },

  { name: "md-checkmark-done", key: " 61952" },

  { name: "md-chevron-back", key: " 61960" },

  { name: "md-chevron-down", key: " 61966" },

  { name: "md-chevron-forward", key: " 61972" },

  { name: "md-chevron-up", key: " 61978" },

  { name: "md-clipboard", key: " 61984" },

  { name: "md-close", key: " 61987" },

  { name: "md-cloud", key: " 61993" },

  { name: "md-cloud-done", key: " 61997" },

  { name: "md-cloud-download", key: " 62000" },

  { name: "md-cloud-offline", key: " 62003" },

  { name: "md-cloud-upload", key: " 62008" },

  { name: "md-cloudy", key: " 62011" },
  { name: "md-cloudy-night", key: " 62012" },

  { name: "md-code", key: " 62017" },
  { name: "md-code-download", key: " 62018" },

  { name: "md-code-slash", key: " 62023" },

  { name: "md-code-working", key: " 62026" },

  { name: "md-cog", key: " 62029" },

  { name: "md-color-fill", key: " 62032" },

  { name: "md-color-filter", key: " 62035" },

  { name: "md-color-palette", key: " 62038" },

  { name: "md-color-wand", key: " 62041" },

  { name: "md-compass", key: " 62044" },

  { name: "md-construct", key: " 62047" },

  { name: "md-contract", key: " 62050" },

  { name: "md-contrast", key: " 62053" },

  { name: "md-copy", key: " 62056" },

  { name: "md-create", key: " 62059" },

  { name: "md-crop", key: " 62062" },

  { name: "md-cube", key: " 62065" },

  { name: "md-cut", key: " 62068" },

  { name: "md-desktop", key: " 62071" },

  { name: "md-disc", key: " 62074" },

  { name: "md-document", key: " 62077" },
  { name: "md-document-attach", key: " 62078" },

  { name: "md-document-text", key: " 62083" },

  { name: "md-documents", key: " 62086" },

  { name: "md-download", key: " 62089" },

  { name: "md-duplicate", key: " 62092" },

  { name: "md-ear", key: " 62095" },

  { name: "md-earth", key: " 62098" },

  { name: "md-easel", key: " 62101" },

  { name: "md-egg", key: " 62104" },

  { name: "md-ellipse", key: " 62107" },

  { name: "md-ellipsis-horizontal", key: " 62110" },

  { name: "md-ellipsis-vertical", key: " 62116" },

  { name: "md-enter", key: " 62122" },

  { name: "md-exit", key: " 62125" },

  { name: "md-expand", key: " 62128" },

  { name: "md-eye", key: " 62131" },
  { name: "md-eye-off", key: " 62132" },

  { name: "md-eyedrop", key: " 62137" },

  { name: "md-fast-food", key: " 62140" },

  { name: "md-female", key: " 62143" },

  { name: "md-file-tray", key: " 62146" },
  { name: "md-file-tray-full", key: " 62147" },

  { name: "md-file-tray-stacked", key: " 62152" },

  { name: "md-film", key: " 62155" },

  { name: "md-filter", key: " 62158" },

  { name: "md-finger-print", key: " 62161" },

  { name: "md-fitness", key: " 62164" },

  { name: "md-flag", key: " 62167" },

  { name: "md-flame", key: " 62170" },

  { name: "md-flash", key: " 62173" },
  { name: "md-flash-off", key: " 62174" },

  { name: "md-flashlight", key: " 62179" },

  { name: "md-flask", key: " 62182" },

  { name: "md-flower", key: " 62185" },

  { name: "md-folder", key: " 62188" },
  { name: "md-folder-open", key: " 62189" },

  { name: "md-football", key: " 62194" },

  { name: "md-funnel", key: " 62197" },

  { name: "md-game-controller", key: " 62200" },

  { name: "md-gift", key: " 62203" },

  { name: "md-git-branch", key: " 62206" },

  { name: "md-git-commit", key: " 62209" },

  { name: "md-git-compare", key: " 62212" },

  { name: "md-git-merge", key: " 62215" },

  { name: "md-git-network", key: " 62218" },

  { name: "md-git-pull-request", key: " 62221" },

  { name: "md-glasses", key: " 62224" },

  { name: "md-globe", key: " 62227" },

  { name: "md-golf", key: " 62230" },

  { name: "md-grid", key: " 62233" },

  { name: "md-hammer", key: " 62236" },

  { name: "md-hand-left", key: " 62239" },

  { name: "md-hand-right", key: " 62242" },

  { name: "md-happy", key: " 62245" },

  { name: "md-hardware-chip", key: " 62248" },

  { name: "md-headset", key: " 62251" },

  { name: "md-heart", key: " 62254" },

  { name: "md-heart-dislike", key: " 62258" },

  { name: "md-heart-half", key: " 62264" },

  { name: "md-help", key: " 62269" },
  { name: "md-help-buoy", key: " 62270" },

  { name: "md-home", key: " 62278" },

  { name: "md-hourglass", key: " 62281" },

  { name: "md-ice-cream", key: " 62284" },

  { name: "md-image", key: " 62287" },

  { name: "md-images", key: " 62290" },

  { name: "md-infinite", key: " 62293" },

  { name: "md-information", key: " 62296" },

  { name: "md-journal", key: " 62302" },

  { name: "md-key", key: " 62305" },

  { name: "md-keypad", key: " 62308" },

  { name: "md-language", key: " 62311" },

  { name: "md-laptop", key: " 62314" },

  { name: "md-layers", key: " 62317" },

  { name: "md-leaf", key: " 62320" },

  { name: "md-library", key: " 62323" },

  { name: "md-link", key: " 62326" },

  { name: "md-list", key: " 62329" },

  { name: "md-locate", key: " 62335" },

  { name: "md-location", key: " 62338" },

  { name: "md-lock-closed", key: " 62341" },

  { name: "md-lock-open", key: " 62344" },

  { name: "md-log-in", key: " 62347" },

  { name: "md-log-out", key: " 62350" },

  { name: "md-logo-amazon", key: " 62353" },
  { name: "md-logo-amplify", key: " 62354" },
  { name: "md-logo-android", key: " 62355" },
  { name: "md-logo-angular", key: " 62356" },
  { name: "md-logo-apple", key: " 62357" },
  { name: "md-logo-apple-appstore", key: " 62358" },
  { name: "md-logo-bitbucket", key: " 62359" },
  { name: "md-logo-bitcoin", key: " 62360" },
  { name: "md-logo-buffer", key: " 62361" },
  { name: "md-logo-capacitor", key: " 62362" },
  { name: "md-logo-chrome", key: " 62363" },
  { name: "md-logo-closed-captioning", key: " 62364" },
  { name: "md-logo-codepen", key: " 62365" },
  { name: "md-logo-css3", key: " 62366" },
  { name: "md-logo-designernews", key: " 62367" },
  { name: "md-logo-dribbble", key: " 62368" },
  { name: "md-logo-dropbox", key: " 62369" },
  { name: "md-logo-edge", key: " 62370" },
  { name: "md-logo-electron", key: " 62371" },
  { name: "md-logo-euro", key: " 62372" },
  { name: "md-logo-facebook", key: " 62373" },
  { name: "md-logo-firebase", key: " 62374" },
  { name: "md-logo-firefox", key: " 62375" },
  { name: "md-logo-flickr", key: " 62376" },
  { name: "md-logo-foursquare", key: " 62377" },
  { name: "md-logo-github", key: " 62378" },
  { name: "md-logo-google", key: " 62379" },
  { name: "md-logo-google-playstore", key: " 62380" },
  { name: "md-logo-hackernews", key: " 62381" },
  { name: "md-logo-html5", key: " 62382" },
  { name: "md-logo-instagram", key: " 62383" },
  { name: "md-logo-ionic", key: " 62384" },
  { name: "md-logo-ionitron", key: " 62385" },
  { name: "md-logo-javascript", key: " 62386" },
  { name: "md-logo-laravel", key: " 62387" },
  { name: "md-logo-linkedin", key: " 62388" },
  { name: "md-logo-markdown", key: " 62389" },
  { name: "md-logo-no-smoking", key: " 62390" },
  { name: "md-logo-nodejs", key: " 62391" },
  { name: "md-logo-npm", key: " 62392" },
  { name: "md-logo-octocat", key: " 62393" },
  { name: "md-logo-pinterest", key: " 62394" },
  { name: "md-logo-playstation", key: " 62395" },
  { name: "md-logo-pwa", key: " 62396" },
  { name: "md-logo-python", key: " 62397" },
  { name: "md-logo-react", key: " 62398" },
  { name: "md-logo-reddit", key: " 62399" },
  { name: "md-logo-rss", key: " 62400" },
  { name: "md-logo-sass", key: " 62401" },
  { name: "md-logo-skype", key: " 62402" },
  { name: "md-logo-slack", key: " 62403" },
  { name: "md-logo-snapchat", key: " 62404" },
  { name: "md-logo-stackoverflow", key: " 62405" },
  { name: "md-logo-steam", key: " 62406" },
  { name: "md-logo-stencil", key: " 62407" },
  { name: "md-logo-tumblr", key: " 62408" },
  { name: "md-logo-tux", key: " 62409" },
  { name: "md-logo-twitch", key: " 62410" },
  { name: "md-logo-twitter", key: " 62411" },
  { name: "md-logo-usd", key: " 62412" },
  { name: "md-logo-vimeo", key: " 62413" },
  { name: "md-logo-vk", key: " 62414" },
  { name: "md-logo-vue", key: " 62415" },
  { name: "md-logo-web-component", key: " 62416" },
  { name: "md-logo-whatsapp", key: " 62417" },
  { name: "md-logo-windows", key: " 62418" },
  { name: "md-logo-wordpress", key: " 62419" },
  { name: "md-logo-xbox", key: " 62420" },
  { name: "md-logo-xing", key: " 62421" },
  { name: "md-logo-yahoo", key: " 62422" },
  { name: "md-logo-yen", key: " 62423" },
  { name: "md-logo-youtube", key: " 62424" },
  { name: "md-magnet", key: " 62425" },

  { name: "md-mail", key: " 62428" },
  { name: "md-mail-open", key: " 62429" },

  { name: "md-mail-unread", key: " 62434" },

  { name: "md-male", key: " 62437" },
  { name: "md-male-female", key: " 62438" },

  { name: "md-man", key: " 62443" },

  { name: "md-map", key: " 62446" },

  { name: "md-medal", key: " 62449" },

  { name: "md-medical", key: " 62452" },

  { name: "md-medkit", key: " 62455" },

  { name: "md-megaphone", key: " 62458" },

  { name: "md-menu", key: " 62461" },

  { name: "md-mic", key: " 62464" },

  { name: "md-mic-off", key: " 62468" },

  { name: "md-moon", key: " 62476" },

  { name: "md-move", key: " 62479" },

  { name: "md-musical-note", key: " 62482" },

  { name: "md-musical-notes", key: " 62485" },

  { name: "md-navigate", key: " 62488" },

  { name: "md-newspaper", key: " 62494" },

  { name: "md-notifications", key: " 62497" },

  { name: "md-notifications-off", key: " 62501" },

  { name: "md-nuclear", key: " 62509" },

  { name: "md-nutrition", key: " 62512" },

  { name: "md-open", key: " 62515" },

  { name: "md-options", key: " 62518" },

  { name: "md-paper-plane", key: " 62521" },

  { name: "md-partly-sunny", key: " 62524" },

  { name: "md-pause", key: " 62527" },

  { name: "md-paw", key: " 62533" },

  { name: "md-pencil", key: " 62536" },

  { name: "md-people", key: " 62539" },

  { name: "md-person", key: " 62545" },
  { name: "md-person-add", key: " 62546" },

  { name: "md-person-remove", key: " 62553" },

  { name: "md-phone-landscape", key: " 62557" },

  { name: "md-phone-portrait", key: " 62560" },

  { name: "md-pie-chart", key: " 62563" },

  { name: "md-pin", key: " 62566" },

  { name: "md-pint", key: " 62569" },

  { name: "md-pizza", key: " 62572" },

  { name: "md-planet", key: " 62575" },

  { name: "md-play", key: " 62578" },
  { name: "md-play-back", key: " 62579" },

  { name: "md-play-forward", key: " 62588" },

  { name: "md-play-skip-back", key: " 62596" },

  { name: "md-play-skip-forward", key: " 62602" },

  { name: "md-podium", key: " 62608" },

  { name: "md-power", key: " 62611" },

  { name: "md-pricetag", key: " 62614" },

  { name: "md-pricetags", key: " 62617" },

  { name: "md-print", key: " 62620" },

  { name: "md-pulse", key: " 62623" },

  { name: "md-push", key: " 62626" },

  { name: "md-qr-code", key: " 62629" },

  { name: "md-radio", key: " 62632" },
  { name: "md-radio-button-off", key: " 62633" },

  { name: "md-radio-button-on", key: " 62636" },

  { name: "md-rainy", key: " 62641" },

  { name: "md-reader", key: " 62644" },

  { name: "md-receipt", key: " 62647" },

  { name: "md-recording", key: " 62650" },

  { name: "md-refresh", key: " 62653" },

  { name: "md-reload", key: " 62659" },

  { name: "md-remove", key: " 62665" },

  { name: "md-reorder-four", key: " 62671" },

  { name: "md-reorder-three", key: " 62674" },

  { name: "md-reorder-two", key: " 62677" },

  { name: "md-repeat", key: " 62680" },

  { name: "md-resize", key: " 62683" },

  { name: "md-restaurant", key: " 62686" },

  { name: "md-return-down-back", key: " 62689" },

  { name: "md-return-down-forward", key: " 62692" },

  { name: "md-return-up-back", key: " 62695" },

  { name: "md-return-up-forward", key: " 62698" },

  { name: "md-ribbon", key: " 62701" },

  { name: "md-rocket", key: " 62704" },

  { name: "md-rose", key: " 62707" },

  { name: "md-sad", key: " 62710" },

  { name: "md-save", key: " 62713" },

  { name: "md-scan", key: " 62716" },

  { name: "md-school", key: " 62722" },

  { name: "md-search", key: " 62725" },

  { name: "md-send", key: " 62731" },

  { name: "md-server", key: " 62734" },

  { name: "md-settings", key: " 62737" },

  { name: "md-shapes", key: " 62740" },

  { name: "md-share", key: " 62743" },

  { name: "md-share-social", key: " 62746" },

  { name: "md-shield", key: " 62749" },
  { name: "md-shield-checkmark", key: " 62750" },

  { name: "md-shirt", key: " 62755" },

  { name: "md-shuffle", key: " 62758" },

  { name: "md-skull", key: " 62761" },

  { name: "md-snow", key: " 62764" },

  { name: "md-speedometer", key: " 62767" },

  { name: "md-square", key: " 62770" },

  { name: "md-star", key: " 62773" },
  { name: "md-star-half", key: " 62774" },

  { name: "md-stats-chart", key: " 62779" },

  { name: "md-stop", key: " 62782" },

  { name: "md-stopwatch", key: " 62788" },

  { name: "md-subway", key: " 62791" },

  { name: "md-sunny", key: " 62794" },

  { name: "md-swap-horizontal", key: " 62797" },

  { name: "md-swap-vertical", key: " 62800" },

  { name: "md-sync", key: " 62803" },

  { name: "md-tablet-landscape", key: " 62809" },

  { name: "md-tablet-portrait", key: " 62812" },

  { name: "md-tennisball", key: " 62815" },

  { name: "md-terminal", key: " 62818" },

  { name: "md-text", key: " 62821" },

  { name: "md-thermometer", key: " 62824" },

  { name: "md-thumbs-down", key: " 62827" },

  { name: "md-thumbs-up", key: " 62830" },

  { name: "md-thunderstorm", key: " 62833" },

  { name: "md-time", key: " 62836" },

  { name: "md-timer", key: " 62839" },

  { name: "md-today", key: " 62842" },

  { name: "md-toggle", key: " 62845" },

  { name: "md-trail-sign", key: " 62848" },

  { name: "md-train", key: " 62851" },

  { name: "md-transgender", key: " 62854" },

  { name: "md-trash", key: " 62857" },
  { name: "md-trash-bin", key: " 62858" },

  { name: "md-trending-down", key: " 62863" },

  { name: "md-trending-up", key: " 62866" },

  { name: "md-triangle", key: " 62869" },

  { name: "md-trophy", key: " 62872" },

  { name: "md-tv", key: " 62875" },

  { name: "md-umbrella", key: " 62878" },

  { name: "md-videocam", key: " 62881" },

  { name: "md-volume-high", key: " 62884" },

  { name: "md-volume-low", key: " 62887" },

  { name: "md-volume-medium", key: " 62890" },

  { name: "md-volume-mute", key: " 62893" },

  { name: "md-volume-off", key: " 62896" },

  { name: "md-walk", key: " 62899" },

  { name: "md-wallet", key: " 62902" },

  { name: "md-warning", key: " 62905" },

  { name: "md-watch", key: " 62908" },

  { name: "md-water", key: " 62911" },

  { name: "md-wifi", key: " 62914" },

  { name: "md-wine", key: " 62917" },

  { name: "md-woman", key: " 62920" },
];

export default icons;
