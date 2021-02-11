# backend Guestbook

Dieses Backend regelt die Infomationslogistick in der Application 'Guestbook' zwischen MondoDD in der Die Informationen Gespeichert sind und dem Frontend welches die Informationen für den Nutzer Grafisch rendert. 

Index.js ist das Haupt script, welches einen Server öffnet auf dem weiteren scripte augeführt werden.
in posts.js Enthalten sind die Api Endpoints über die das Frontende via http mit dem backend kommuniziert. und die Endpoints mit denen bestimmte Daten aus der Datenbank ausgelesen werden.

Die Datenpackete die verarbeitet werden sind immer JSONs diese werden in den Skripten events.js, profiles.js und sniffers.js definiert werden.

Der Databasehandler regelt dann welche JSONS in welcher Collection der Datenbank gespeicher werden.

Für die Verwendung und das aufsetzen des Backend, 
sind die Folgenden tool zu installieren:
    Express
    Mongoose
    Podyparser
    Cors

Außerdem ist eine Datenbank in MongoDB an zu legen und die Connection in der config.js zu ersetzen.  


