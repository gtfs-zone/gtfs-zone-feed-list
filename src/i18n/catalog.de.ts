import type { Translation } from 'gtfs-zone-web-common/i18n/index';
import type { en } from './catalog.en';

/** list.gtfs.zone's UI strings, in German. */
export const de: Translation<typeof en> = {
  'app.title':
    'list.gtfs.zone - Alle öffentlichen GTFS-Feeds, schnell, kostenlos und quelloffen',

  'shell.loading': 'Katalog wird geladen',
  'shell.browse': 'Durchsuchen',
  'shell.guide': 'Anleitung',
  'shell.search': 'Feeds, Betreiber, Orte suchen',
  'shell.checked': 'Geprüft am {date}',
  'nav.theme': 'Design wechseln',

  'boot.loadingOf': 'Katalog wird geladen ({received} von {total})',
  'boot.loadingBytes': 'Katalog wird geladen ({received})',
  'boot.failed': 'Katalog konnte nicht geladen werden: {message}',
  'boot.failedPanel': 'Der Katalog konnte nicht geladen werden.',
  'boot.retry': 'Erneut versuchen',
  'boot.noFeed': 'Nichts in diesem Katalog passt zum verlinkten Feed',
  'boot.noSource': 'Nichts in diesem Katalog passt zur verlinkten Quelle',
  'boot.detailFailed':
    'Die Katalogquellen konnten nicht geladen werden: {message}',

  'kind.static': 'Fahrplan',
  'kind.rt': 'Echtzeit',

  'content.ok': 'Gültiges GTFS-Zip',
  'content.not_zip': 'Kein Zip',
  'content.missing_files': 'GTFS-Dateien fehlen',
  'content.parse_error': 'Zip nicht lesbar',
  'content.http_error': 'Download fehlgeschlagen',
  'content.timeout': 'Zeitüberschreitung beim Download',
  'content.memory': 'Zu groß zum Verarbeiten',
  'content.error': 'Verarbeitung fehlgeschlagen',

  'sniff.html': 'eine HTML-Seite',
  'sniff.json': 'JSON',
  'sniff.xml': 'XML',
  'sniff.empty': 'eine leere Antwort',

  'error.dns': 'DNS-Auflösung fehlgeschlagen',
  'error.tls': 'TLS-Fehler',
  'error.timeout': 'Zeitüberschreitung',
  'error.refused': 'Verbindung abgelehnt',
  'error.http_4xx': 'Client-Fehler',
  'error.http_5xx': 'Serverfehler',

  'unit.bytes': '{n} B',

  'status.needsKey': 'benötigt einen API-Schlüssel',
  'status.downSince': 'ausgefallen seit {date}',
  'status.neverUp': 'nie erreichbar gewesen',
  'status.upSince': 'erreichbar seit {date}',
  'status.partialSince': 'teilweise erreichbar seit {date}',
  'status.notAnswering': 'antwortet nicht',
  'status.someRealtime': 'ein Teil der Echtzeitdaten antwortet nicht',

  'field.place': 'Ort',
  'field.altNames': 'Auch bekannt als',
  'field.scheduleSize': 'Größe des Fahrplans',
  'field.lastModified': 'Zuletzt geändert',
  'field.scheduleContents': 'Inhalt des Fahrplans',
  'field.service': 'Gültigkeit',
  'field.publisher': 'Herausgeber',
  'field.version': 'Version',
  'field.contents': 'Inhalt',
  'field.feedId': 'Feed-ID',
  'field.operator': 'Betreiber',
  'field.catalogId': 'Katalog-ID',
  'field.from': 'Herkunft',
  'field.catalogStatus': 'Katalogstatus',
  'field.license': 'Lizenz',
  'field.sameEndpoint': 'Gleiche Adresse wie',
  'field.redirectsTo': 'Leitet weiter zu',
  'field.state': 'Zustand',
  'field.httpStatus': 'HTTP-Status',
  'field.error': 'Fehler',
  'field.latency': 'Antwortzeit',
  'field.failures': 'Fehlgeschlagene Prüfungen in Folge',
  'field.downSince': 'Ausgefallen seit',
  'field.stateSince': 'In diesem Zustand seit',
  'field.access': 'Zugang',

  'hint.place':
    'Wo der Katalog diesen Feed verortet. Nur die Mobility Database liefert Koordinaten.',
  'hint.altNames':
    'Weitere Namen dieses Feeds: die seiner Katalogeinträge, seiner Betreiber und der Verkehrsunternehmen in seinem Fahrplan.',
  'hint.scheduleSize':
    'Die Größe des Fahrplan-Zips, laut Content-Length-Header der letzten Prüfung.',
  'hint.lastModified':
    'Der Last-Modified-Header des Fahrplans bei der letzten Prüfung.',
  'hint.scheduleContents':
    'Was der letzte Download des Fahrplans enthielt, laut sites.gtfs.zone, das daraus eine Fahrplan-Website erstellt. Nur für die Feeds geprüft, die es erstellt.',
  'hint.service':
    'Der erste und der letzte Verkehrstag des Fahrplans, laut seinen Kalendern.',
  'hint.publisher':
    'Der in der feed_info.txt des Fahrplans genannte Herausgeber.',
  'hint.version': 'Die in der feed_info.txt des Fahrplans genannte Version.',
  'hint.contents': 'Linien, Haltestellen und Fahrten im Fahrplan.',
  'hint.feedId': 'Die ID dieses zusammengeführten Feeds auf list.gtfs.zone.',
  'hint.operator':
    'Das Verkehrsunternehmen oder die Organisation, die diesen Feed laut Katalog betreibt.',
  'hint.catalogId':
    'Die ID dieses Eintrags in seinem Katalog; verlinkt auf die Seite des Katalogs zu diesem Eintrag.',
  'hint.from': 'Woher der Katalog selbst diesen Eintrag hat.',
  'hint.catalogStatus':
    'Der Lebenszyklus dieses Eintrags laut Katalog: aktiv, veraltet, inaktiv usw.',
  'hint.license': 'Die Lizenz, die der Katalog für diesen Feed angibt.',
  'hint.sameEndpoint':
    'Einträge anderer Kataloge, die auf dieselbe URL verweisen.',
  'hint.redirectsTo':
    'Wo die URL bei der letzten Prüfung nach den Weiterleitungen gelandet ist.',
  'hint.state':
    'Erreichbar: hat bei der letzten Prüfung geantwortet. Ausgefallen: ist dabei gescheitert. Unzugänglich: benötigt einen Schlüssel oder wurde nicht geprüft. Klicken Sie für die Anleitung.',
  'hint.httpStatus': 'Der Statuscode der letzten Prüfung.',
  'hint.error': 'Warum die letzte Prüfung fehlgeschlagen ist.',
  'hint.latency': 'Wie lange die Antwort bei der letzten Prüfung gedauert hat.',
  'hint.failures':
    'Aufeinanderfolgende tägliche Prüfungen, die fehlgeschlagen sind.',
  'hint.downSince':
    'Seit wann die URL nicht mehr antwortet, oder nie erreichbar gewesen, wenn keine Prüfung sie je antworten sah.',
  'hint.stateSince':
    'Wann der aktuelle Zustand zum ersten Mal festgestellt wurde.',
  'hint.access': 'URLs, die einen API-Schlüssel benötigen, werden nie geprüft.',

  'crumb.feed': 'Feed',
  'crumb.allFeeds': 'Alle Feeds',
  'crumb.source': 'Quelle {catalog}',

  'detail.failed': 'Die Katalogquellen konnten nicht geladen werden.',
  'detail.loading': 'Katalogquellen werden geladen...',
  'unplaced.note': 'ohne Koordinaten, nur in der Liste ({why})',
  'unplaced.why': 'warum?',
  'unplaced.badge': 'nicht verortet',
  'unplaced.title': 'Ohne Koordinaten',

  'home.feeds': 'Feeds',
  'home.onlyRealtime': 'Nur Feeds mit Echtzeitdaten',
  'home.sources_one': '{count} Quelle',
  'home.sources_other': '{count} Quellen',
  'home.matching_one': '{n} Treffer',
  'home.matching_other': '{n} Treffer',
  'home.firstShown': ', die ersten {count} angezeigt',
  'home.newestFirst': ', neueste Fahrpläne zuerst',
  'home.nearestFirst': ', nächstgelegene zuerst',
  'home.unplaced': '({count} ohne Koordinaten, nicht auf der Karte)',
  'home.noMatch': 'Keine Feeds passen zu diesen Filtern',
  'home.more': '{count} weitere; grenzen Sie die Suche ein, um sie zu sehen',
  'home.near': 'In der Nähe von {name}',
  'home.clearNear': 'Nicht mehr nach Entfernung sortieren',

  'feed.moreUrls_one': '{count} weitere URL aus anderen Katalogen',
  'feed.moreUrls_other': '{count} weitere URLs aus anderen Katalogen',
  'feed.catalogSources_one': '{count} Katalogquelle',
  'feed.catalogSources_other': '{count} Katalogquellen',
  'feed.catalogSourcesPending': 'Katalogquellen',
  'feed.openEditor': 'Im Editor öffnen',
  'feed.openViewer': 'Im Viewer öffnen',
  'feed.contentSince': '{content}, seit {date}',
  'feed.serviceRange': '{start} bis {end}',
  'feed.contents': '{routes} Linien, {stops} Haltestellen, {trips} Fahrten',
  'feed.roles': 'Rollen',
  'feed.howMerged': 'wie Feeds zusammengeführt werden',

  'source.redirect': 'der Katalogeintrag verweist auf eine Weiterleitung',
  'source.urls': 'URLs',
  'source.lastCheck': 'Letzte Prüfung',

  'map.cluster':
    '{total} Feeds: {up} erreichbar, {partial} teilweise, {down} ausgefallen, {unknown} unzugänglich',

  'help.overview.label': 'Überblick',
  'help.overview.title': 'Alle öffentlichen GTFS-Feeds, und ob sie antworten',
  'help.overview.lede':
    'Alle öffentlichen GTFS-Fahrplan- und GTFS-Realtime-Feeds aus dem Transitland Atlas, der Mobility Database und von rt.gtfs.zone, zu einem Eintrag pro Verkehrsnetz zusammengeführt und täglich geprüft.',
  'help.overview.search': 'Suchen',
  'help.overview.searchText':
    'Die Eingabe ins Suchfeld filtert Liste und Karte schon beim Tippen und schlägt die besten Treffer in einer Auswahlliste vor: nach Name, nach Ort oder nach dem Host, der den Feed bereitstellt. Orte und Sehenswürdigkeiten werden unter den Treffern vorgeschlagen; die Auswahl eines Ortes bewegt die Karte dorthin und listet die nächstgelegenen Feeds zuerst. Die Zähler oben in der Liste filtern sie nach Zustand, der Schalter darunter auf Feeds mit Echtzeitdaten.',
  'help.overview.browse': 'Durchsuchen',
  'help.overview.browseText':
    'Die Liste zeigt zuerst die zuletzt geänderten Fahrpläne, während einer Suche die besten Treffer. Wählen Sie einen Feed in der Liste, auf der Karte oder in der Auswahlliste, um seine Fahrplan- und Echtzeit-URLs zu sehen und jeden Katalogeintrag, aus dem er stammt.',
  'help.overview.open': 'Öffnen',
  'help.overview.openText':
    'Ein Feed mit Fahrplan öffnet sich im Editor; ein Feed mit Fahrplan und Echtzeitdaten öffnet sich auch im Viewer.',
  'help.overview.version': 'Version {version}',

  'help.states.label': 'Erreichbar, teilweise, ausgefallen, unzugänglich',
  'help.states.title':
    'Was erreichbar, teilweise, ausgefallen und unzugänglich bedeuten',
  'help.states.check':
    'Einmal täglich werden nur die Header jeder URL abgefragt: mit einer HEAD-Anfrage oder, wenn der Server HEAD ablehnt, mit einem GET über ein einziges Byte. Kein Feed wird heruntergeladen.',
  'help.states.url':
    'Eine URL ist erreichbar, wenn sie erfolgreich geantwortet hat, gegebenenfalls nach Weiterleitungen, und ausgefallen, wenn die Prüfung gescheitert ist: DNS, TLS, Zeitüberschreitung, abgelehnte Verbindung oder HTTP-Fehler. Eine URL, die einen API-Schlüssel benötigt, wird nie geprüft.',
  'help.states.roles':
    'Ein Feed hat Rollen: seinen Fahrplan sowie seine Echtzeit-Fahrtaktualisierungen, Fahrzeugpositionen und Störungsmeldungen. Eine Rolle ist erreichbar, sobald eine ihrer URLs geantwortet hat: Ein Katalog mit einer fehlerhaften URL lässt also keinen Feed ausfallen, dessen andere URL funktioniert. Der Feed selbst ist:',
  'help.states.up': 'Erreichbar',
  'help.states.upText':
    'Sein Fahrplan und jede Echtzeitrolle haben geantwortet.',
  'help.states.partial': 'Teilweise',
  'help.states.partialText':
    'Sein Fahrplan hat geantwortet, mindestens eine Echtzeitrolle aber nicht. Ohne geprüften Fahrplan haben einige Echtzeitrollen geantwortet und andere nicht.',
  'help.states.down': 'Ausgefallen',
  'help.states.downText':
    'Sein Fahrplan hat nicht geantwortet. „Ausgefallen seit“ gibt an, seit wann er nicht mehr antwortet, oder „nie erreichbar gewesen“, wenn keine Prüfung ihn je antworten sah. Ohne geprüften Fahrplan hat keine seiner Echtzeitrollen geantwortet.',
  'help.states.unknown': 'Unzugänglich',
  'help.states.unknownText':
    'Nichts, was er aufführt, konnte geprüft werden: Jede URL benötigt einen API-Schlüssel, oder keine wurde bisher geprüft.',
  'help.states.chips':
    'Die Kennzeichen an jedem Feed sind seine Echtzeitrollen: TU für Fahrtaktualisierungen, VP für Fahrzeugpositionen, SA für Störungsmeldungen und RT für eine Echtzeit-URL, bei der der Katalog nicht angibt, welche der drei sie liefert. Jedes ist grün, wenn es bei der letzten Prüfung geantwortet hat, sonst rot, und grau, wenn es nicht geprüft wurde.',

  'help.merging.label': 'Zusammenführen von Feeds',
  'help.merging.title': 'Wie aus Katalogeinträgen ein Feed wird',
  'help.merging.lede':
    'Kataloge führen dasselbe Verkehrsnetz getrennt auf und trennen oft auch seinen Fahrplan und seine Echtzeitdaten in eigene Einträge. Hier werden sie zu einem Feed pro Verkehrsnetz zusammengeführt, ohne dass etwas verloren geht: Jeder Feed verweist auf jeden Katalogeintrag, aus dem er stammt.',
  'help.merging.sameUrl':
    'Einträge, die nach Normalisierung dieselbe URL angeben, sind derselbe Feed.',
  'help.merging.crossRef':
    'Querverweise der Mobility Database zwischen einem Fahrplan und seinen Echtzeitdaten führen beide zusammen.',
  'help.merging.realtime':
    'Echtzeit-URLs mit gleichem Host und gleichem Pfad, die sich nur in einem letzten Segment vehicles, trips oder alerts unterscheiden, bilden einen einzigen Feed.',
  'help.merging.noFuzzy':
    'Es gibt keinen unscharfen Abgleich über Namen: Zwei Einträge desselben Verkehrsnetzes mit verschiedenen URLs und ohne Querverweis bleiben getrennt. Ein Feed behält seine ID von Tag zu Tag, solange die meisten seiner Einträge zusammenbleiben.',
  'help.merging.names':
    'Der Name ist der des Transitland-Betreibers, sonst der des Mobility-Database-Anbieters (der Name seines Feeds wird zum Untertitel), sonst der des einzigen im Fahrplan genannten Verkehrsunternehmens, sonst der eines Katalogeintrags. Alle anderen Namen bleiben erhalten, und die Suche findet den Feed unter jedem davon.',

  'help.unplaced.label': 'Nicht verortete Feeds',
  'help.unplaced.title': 'Warum manche Feeds nicht auf der Karte sind',
  'help.unplaced.coordinates':
    'Die Koordinaten stammen aus der Mobility Database, die für die meisten ihrer Feeds einen Standort und eine Ausdehnung erfasst. Einträge im Transitland Atlas nennen keinen Ort: Ein Feed, der nur in Transitland vorkommt, kann daher nicht eingezeichnet werden.',
  'help.unplaced.merged':
    'Ein Feed, der einen Transitland-Eintrag mit einem Mobility-Database-Eintrag zusammenführt, übernimmt den Ort aus der Mobility Database. Die übrigen werden gelistet, aber nicht kartiert, und ihre Anzahl wird immer neben der Karte angezeigt, statt verschwiegen zu werden.',

  'help.sources.label': 'Woher die Daten stammen',
  'help.sources.title': 'Woher die Daten stammen',
  'help.sources.lede':
    'Vier Kataloge, täglich von gtfs-zone-feed-catalog aktualisiert:',
  'help.sources.transitland': '{link}: der offene DMFR-Bestand, {license}',
  'help.sources.mobilitydatabase':
    '{link}: der Katalog von MobilityData, mit Orten, {license}',
  'help.sources.gtfszone':
    '{link}: die Echtzeit-Feeds, die gtfs.zone selbst bereitstellt, etwa Amtrak',
  'help.sources.ntd':
    '{link}: die GTFS-Links, die US-Verkehrsbetriebe an die FTA melden, gemeinfrei',
  'help.sources.json':
    'Alles, was diese Seite zeigt, wird als JSON auf {link} veröffentlicht: {search} für die zusammengeführten Feeds in Kurzform, {feeds} für sie vollständig, {sources} für die Katalogeinträge und {status} für jede Prüfung.',
  'help.sources.licenses':
    'Die Kataloge geben an, wo die Feeds zu finden sind; die Feeds selbst gehören ihren Herausgebern. Die Seite jedes Feeds verweist auf die Lizenz, die sein Katalog angibt, und diese Lizenz, nicht die dieser Website, gilt für die Daten.',
};
