import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languages = [
	{ label: 'English', code: 'en' },
	{ label: 'Français', code: 'fr' },
	{ label: 'Español', code: 'es' },
	{ label: 'Deutsch', code: 'de' },
];

i18n
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				translation: {
					description: 'Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times.',
					home: 'Home',
					boxes: 'Boxes',
					scans: 'Scans',
					export: 'Export',
					delete: 'Delete',
					inprogress: 'In Progress',
					delivered: 'Delivered',
					confusing: 'Confusing',
					noscans: 'No Scans Yet',
					uploadPrompt: 'Upload boxes from a distribution list',
					noBoxes: 'No boxes found',
					deleteOptions: 'Delete options',
					select: 'Select {{option}}',
					waitBoxesLoading: 'Please wait while the boxes are loading...',
					deleteBoxes: 'Delete boxes',
					confirmDelete: 'Are you sure you want to proceed to the removal? This action cannot be undone.',
					by: 'By {{item}}',
					exportOptions: 'Export options',
					invalidEmail: 'Must be a valid email',
					emailRequired: 'Email is required',
					passwordRequired: 'Password is required',
					invalidCredentials: 'Invalid username or password',
					noAccountYet: 'Don\'t have an account yet?',
					register: 'Register',
					email: 'Email Address',
					password: 'Password',
					continue: 'Continue',
					nameRequired: 'Name is required',
					alreadyHaveAccount: 'Already have an account?',
					login: 'Log in',
					name: 'Name',
					refresh: 'Refresh',
					your: 'Your {{item}}',
					youHaveNo: 'You have no {{item}}.',
					id: 'ID',
					recipient: 'Recipient',
					status: 'Status',
					project: 'Project',
					created: 'Created',
					division: 'Division',
					district: 'District',
					zone: 'Zone',
					personInCharge: 'Person in charge',
					phone: 'Phone',
					institutionType: 'Institution type',
					boxSummary: 'Box summary',
					deleteBox: 'Delete this box',
					confirmAction: 'Confirm action',
					cancel: 'Cancel',
					confirm: 'Confirm',
					informations: 'Informations',
					progressOverview: 'Progress overview',
					loading: 'Loading...',
					box: 'Box',
					location: 'Location',
					time: 'Time',
					comment: 'Comment',
					final: 'Final',
					search: 'Search...',
					notScannedInThePast_one: 'Not scanned in the past {{count}} day',
					notScannedInThePast_other: 'Not scanned in the past {{count}} days',
					thereAreXNeverScanned_one: 'There is {{count}} box that was never scanned.',
					thereAreXNeverScanned_other: 'There are {{count}} boxes that were never scanned.',
					thereAreXDelivered_one: 'There is {{count}} box that is already delivered.',
					thereAreXDelivered_other: 'There are {{count}} boxes that are already delivered.',
					itemsWillBeDeleted_one: '{{count}} item will be deleted.',
					itemsWillBeDeleted_other: '{{count}} items will be deleted.',
					itemsWillBeExported_one: '{{count}} item will be exported.',
					itemsWillBeExported_other: '{{count}} items will be exported.',
					secondsAgo_one: '{{count}} second ago',
					secondsAgo_other: '{{count}} seconds ago',
					minutesAgo_one: '{{count}} minute ago',
					minutesAgo_other: '{{count}} minutes ago',
					hoursAgo_one: '{{count}} hour ago',
					hoursAgo_other: '{{count}} hours ago',
					daysAgo_one: '{{count}} day ago',
					daysAgo_other: '{{count}} days ago',
					weeksAgo_one: '{{count}} week ago',
					weeksAgo_other: '{{count}} weeks ago',
					monthsAgo_one: '{{count}} month ago',
					monthsAgo_other: '{{count}} months ago',
					yearsAgo_one: '{{count}} year ago',
					yearsAgo_other: '{{count}} years ago',
					loggedInAs: 'Logged in as',
					justNow: 'Just now',
					future: 'In the future',
					yesterday: 'Yesterday',
					tomorrow: 'Tomorrow',
					lastWeek: 'Last week',
					nextWeek: 'Next week',
					lastMonth: 'Last month',
					nextMonth: 'Next month',
					lastYear: 'Last year',
					nextYear: 'Next year',
					logout: 'Logout',
					drop: 'Drop!',
					dragPrompt: 'Click or Drag files here to upload',
					supportedTypes: 'Supported file types',
					csvExplanation: 'A CSV file can be obtained from any spreadsheet software such as Microsoft Excel, Google Sheets, or Apple Numbers. You can choose this format in your export options.',
					longUpload: 'Upload can be long for large files (500+ items), please be patient.',
					uploadFinished: 'Upload finished!',
					close: 'Close',
					summary: 'Summary',
					boxCreated: 'Box n°{{id}} was successfully created.',
					download: 'Download {{item}}',
					report: 'Report',
					username: 'Username',
					invalidUsername: 'Invalid username',
					usernameRequired: 'Username is required',
					reportNotAvailableOnMobile: 'Reports are not available on mobile. Please use a desktop browser to access this feature.',
					scansPerDate: 'Scans per date',
					progressFunnel: 'Progress funnel',
					scannedAtLeastOnce: 'Scanned at least once',
					total: 'Total',
					notAuthorized: 'You are not authorized to see this content.',
					error: 'Error',
					insights: 'Insights',
					yourInsightsAreCurrently: 'Your insights are currently',
					public: 'public',
					private: 'private',
					make: 'Make',
					copied: 'Copied!',
					accessLink: 'Access link',
					neverScanned: 'Never scanned',
					notScanned: 'Not scanned',
					scanned: 'Scanned',
					filterOptions: 'Filter options',
					progress: 'Progress',
					any: 'Any',
					all: 'All',
					columnOrder: 'Column order',
					printableLabels: 'Printable labels',
					printableLabelsDetail: 'Downloads the boxes as labels with QR codes to be printed',
					endOfDeliveryReport: 'End of delivery report',
					endOfDeliveryReportDetail: 'Downloads a report with, for each box, the id, the school, if it reached final destination, and if so the date of the scan',
				}
			},
			fr: {
				translation: {
					description: 'Suivez et tracez vos colis facilement grâce à notre application web Track-and-Trace. Restez informé en temps réel de l\'état et de la localisation de vos expéditions. Suivez facilement la progression de la livraison et ayez la tranquillité d\'esprit en sachant où se trouvent vos colis à tout moment.',
					home: 'Accueil',
					boxes: 'Boîtes',
					scans: 'Scans',
					export: 'Exporter',
					delete: 'Supprimer',
					inprogress: 'En chemin',
					delivered: 'Livré',
					confusing: 'Préoccupant',
					noscans: 'Aucun scan',
					uploadPrompt: 'Uploadez des boîtes depuis une liste de distribution',
					noBoxes: 'Aucune boîte trouvée',
					deleteOptions: 'Options de suppression',
					select: 'Sélectionner {{option}}',
					waitBoxesLoading: 'Veuillez patienter pendant que les boîtes chargent...',
					deleteBoxes: 'Supprimer les boîtes',
					confirmDelete: 'Êtes-vous sûr de vouloir procéder à la suppression ? Cette action est irréversible.',
					by: 'Par {{item}}',
					exportOptions: 'Options d\'exportation',
					invalidEmail: 'L\'adresse e-mail doit être valide',
					emailRequired: 'L\'adresse e-mail est obligatoire',
					passwordRequired: 'Le mot de passe est obligatoire',
					invalidCredentials: 'E-mail ou mot de passe incorrect',
					noAccountYet: 'Vous n\'avez pas encore de compte ?',
					register: 'S\'inscrire',
					email: 'Adresse e-mail',
					password: 'Mot de passe',
					continue: 'Continuer',
					nameRequired: 'Le nom est obligatoire',
					alreadyHaveAccount: 'Vous avez déjà un compte ?',
					login: 'Se connecter',
					name: 'Nom',
					refresh: 'Actualiser',
					your: 'Vos {{item}}',
					youHaveNo: 'Vous n\'avez pas de {{item}}.',
					id: 'ID',
					recipient: 'Destinataire',
					status: 'Statut',
					project: 'Projet',
					created: 'Créé',
					division: 'Division',
					district: 'District',
					zone: 'Zone',
					personInCharge: 'Responsable',
					phone: 'Téléphone',
					institutionType: 'Type d\'institution',
					boxSummary: 'Infos de la boîte',
					deleteBox: 'Supprimer cette boîte',
					confirmAction: 'Confirmer l\'action',
					cancel: 'Annuler',
					confirm: 'Confirmer',
					informations: 'Informations',
					progressOverview: 'Aperçu de la progression',
					loading: 'Chargement...',
					box: 'Boîte',
					location: 'Emplacement',
					time: 'Date',
					comment: 'Commentaire',
					final: 'Arrivée',
					search: 'Rechercher...',
					notScannedInThePast_one: 'Pas scanné dans les dernières 24h',
					notScannedInThePast_other: 'Pas scanné dans les {{count}} derniers jours',
					thereAreXNeverScanned_one: 'Il y a {{count}} boîte qui n\'a jamais été scannée.',
					thereAreXNeverScanned_other: 'Il y a {{count}} boîtes qui n\'ont jamais été scannées.',
					thereAreXDelivered_one: 'Il y a {{count}} boîte qui a déjà été livrée.',
					thereAreXDelivered_other: 'Il y a {{count}} boîtes qui ont déjà été livrées.',
					itemsWillBeDeleted_one: '{{count}} élément sera supprimé.',
					itemsWillBeDeleted_other: '{{count}} éléments seront supprimés.',
					itemsWillBeExported_one: '{{count}} élément sera exporté.',
					itemsWillBeExported_other: '{{count}} éléments seront exportés.',
					secondsAgo_one: 'il y a {{count}} seconde',
					secondsAgo_other: 'il y a {{count}} secondes',
					minutesAgo_one: 'il y a {{count}} minute',
					minutesAgo_other: 'il y a {{count}} minutes',
					hoursAgo_one: 'il y a {{count}} heure',
					hoursAgo_other: 'il y a {{count}} heures',
					daysAgo_one: 'il y a {{count}} jour',
					daysAgo_other: 'il y a {{count}} jours',
					weeksAgo_one: 'il y a {{count}} semaine',
					weeksAgo_other: 'il y a {{count}} semaines',
					monthsAgo_one: 'il y a {{count}} mois',
					monthsAgo_other: 'il y a {{count}} mois',
					yearsAgo_one: 'il y a {{count}} an',
					yearsAgo_other: 'il y a {{count}} ans',
					justNow: 'À l\'instant',
					future: 'À l\'avenir',
					yesterday: 'Hier',
					tomorrow: 'Demain',
					lastWeek: 'La semaine dernière',
					nextWeek: 'La semaine prochaine',
					lastMonth: 'Le mois dernier',
					nextMonth: 'Le mois prochain',
					lastYear: 'L\'année dernière',
					nextYear: 'L\'année prochaine',
					loggedInAs: 'Connecté en tant que',
					logout: 'Déconnexion',
					drop: 'Lâchez !',
					dragPrompt: 'Cliquez ou glissez-déposez des fichiers ici pour les uploader',
					supportedTypes: 'Types de fichiers pris en charge',
					csvExplanation: 'Un fichier CSV peut être obtenu à partir de n\'importe quel tableur tel que Microsoft Excel, Google Sheets ou Apple Numbers. Vous pouvez choisir ce format dans vos options d\'exportation.',
					longUpload: 'Le téléchargement peut être long pour les gros fichiers (500+ éléments), veuillez patienter.',
					uploadFinished: 'Upload terminé !',
					close: 'Fermer',
					summary: 'Résumé',
					boxCreated: 'La boîte n°{{id}} a été créée avec succès.',
					download: 'Télécharger le {{item}}',
					report: 'Rapport',
					username: 'Nom d\'utilisateur',
					invalidUsername: 'Nom d\'utilisateur invalide',
					usernameRequired: 'Le nom d\'utilisateur est obligatoire',
					reportNotAvailableOnMobile: 'Les rapports ne sont pas disponibles sur mobile. Veuillez utiliser un navigateur de bureau pour accéder à cette fonctionnalité.',
					scansPerDate: 'Scans par date',
					progressFunnel: 'Entonnoir de progression',
					scannedAtLeastOnce: 'Scanné au moins une fois',
					total: 'Total',
					notAuthorized: 'Vous n\'êtes pas autorisé à voir ce contenu.',
					error: 'Erreur',
					insights: 'Statistiques',
					yourInsightsAreCurrently: 'Vos statistiques sont actuellement',
					public: 'publiques',
					private: 'privées',
					make: 'Rendre',
					copied: 'Copié !',
					accessLink: 'Lien d\'accès',
					neverScanned: 'Jamais scanné',
					notScanned: 'Pas scanné',
					scanned: 'Scanné',
					filterOptions: 'Options de filtrage',
					progress: 'Progression',
					any: 'Tous',
					all: 'Tous',
					columnOrder: 'Ordre des colonnes',
					printableLabels: 'Étiquettes imprimables',
					printableLabelsDetail: 'Télécharge les boîtes sous forme d\'étiquettes avec QR codes à imprimer',
					endOfDeliveryReport: 'Rapport de fin de livraison',
					endOfDeliveryReportDetail: 'Télécharge un rapport avec, pour chaque boîte, l\'id, l\'école, si elle a atteint sa destination finale, et si oui la date du scan',
				}
			},
			es: {
				translation: {
					description: 'Siga y rastree paquetes fácilmente con Track-and-Trace. Manténgase actualizado sobre el estado y la ubicación de sus envíos en tiempo real. Supervise el progreso de la entrega sin esfuerzo y tenga la tranquilidad de saber dónde están sus paquetes en todo momento.',
					home: 'Inicio',
					boxes: 'Cajas',
					scans: 'Escaneos',
					export: 'Exportar',
					delete: 'Eliminar',
					inprogress: 'En Progreso',
					delivered: 'Entregado',
					confusing: 'Confuso',
					noscans: 'Sin Escaneos',
					uploadPrompt: 'Cargue cajas desde una lista de distribución',
					noBoxes: 'No se encontraron cajas',
					deleteOptions: 'Opciones de Eliminación',
					select: 'Seleccionar {{option}}',
					waitBoxesLoading: 'Espere mientras se cargan las cajas...',
					deleteBoxes: 'Eliminar Cajas',
					confirmDelete: '¿Está seguro de que desea proceder con la eliminación? Esta acción no se puede deshacer.',
					by: 'Por {{item}}',
					exportOptions: 'Opciones de Exportación',
					invalidEmail: 'Debe ser un correo electrónico válido',
					emailRequired: 'Se requiere correo electrónico',
					passwordRequired: 'Se requiere contraseña',
					invalidCredentials: 'Correo electrónico o contraseña incorrecta',
					noAccountYet: '¿Todavía no tienes una cuenta?',
					register: 'Registrarse',
					email: 'Dirección de Correo Electrónico',
					password: 'Contraseña',
					continue: 'Continuar',
					nameRequired: 'Se requiere nombre',
					alreadyHaveAccount: '¿Ya tienes una cuenta?',
					login: 'Iniciar sesión',
					name: 'Nombre',
					refresh: 'Actualizar',
					your: 'Tus {{item}}',
					youHaveNo: 'No tienes {{item}}.',
					id: 'ID',
					recipient: 'Destinatario',
					status: 'Estado',
					project: 'Proyecto',
					created: 'Creado',
					division: 'División',
					district: 'Distrito',
					zone: 'Zona',
					personInCharge: 'Persona a Cargo',
					phone: 'Teléfono',
					institutionType: 'Tipo de Institución',
					boxSummary: 'Resumen de la Caja',
					deleteBox: 'Eliminar esta caja',
					confirmAction: 'Confirmar Acción',
					cancel: 'Cancelar',
					confirm: 'Confirmar',
					informations: 'Informaciones',
					progressOverview: 'Resumen de Progreso',
					loading: 'Cargando...',
					box: 'Caja',
					location: 'Ubicación',
					time: 'Tiempo',
					comment: 'Comentario',
					final: 'Final',
					search: 'Buscar...',
					notScannedInThePast_one: 'No escaneado en el último día',
					notScannedInThePast_other: 'No escaneado en los últimos {{count}} días',
					thereAreXNeverScanned_one: 'Hay {{count}} caja que nunca ha sido escaneada.',
					thereAreXNeverScanned_other: 'Hay {{count}} cajas que nunca han sido escaneadas.',
					thereAreXDelivered_one: 'Hay {{count}} caja que ya ha sido entregada.',
					thereAreXDelivered_other: 'Hay {{count}} cajas que ya han sido entregadas.',
					itemsWillBeDeleted_one: '{{count}} elemento será eliminado.',
					itemsWillBeDeleted_other: '{{count}} elementos serán eliminados.',
					itemsWillBeExported_one: '{{count}} elemento será exportado.',
					itemsWillBeExported_other: '{{count}} elementos serán exportados.',
					secondsAgo_one: 'Hace {{count}} segundo',
					secondsAgo_other: 'Hace {{count}} segundos',
					minutesAgo_one: 'Hace {{count}} minuto',
					minutesAgo_other: 'Hace {{count}} minutos',
					hoursAgo_one: 'Hace {{count}} hora',
					hoursAgo_other: 'Hace {{count}} horas',
					daysAgo_one: 'Hace {{count}} día',
					daysAgo_other: 'Hace {{count}} días',
					weeksAgo_one: 'Hace {{count}} semana',
					weeksAgo_other: 'Hace {{count}} semanas',
					monthsAgo_one: 'Hace {{count}} mes',
					monthsAgo_other: 'Hace {{count}} meses',
					yearsAgo_one: 'Hace {{count}} año',
					yearsAgo_other: 'Hace {{count}} años',
					justNow: 'Justo ahora',
					future: 'En el futuro',
					yesterday: 'Ayer',
					tomorrow: 'Mañana',
					lastWeek: 'La semana pasada',
					nextWeek: 'La semana que viene',
					lastMonth: 'El mes pasado',
					nextMonth: 'El mes que viene',
					lastYear: 'El año pasado',
					nextYear: 'El año que viene',
					loggedInAs: 'Conectado como',
					logout: 'Cerrar Sesión',
					drop: '¡Soltar!',
					dragPrompt: 'Haga clic o arrastre archivos aquí para cargarlos',
					supportedTypes: 'Tipos de archivos admitidos',
					csvExplanation: 'Un archivo CSV se puede obtener desde cualquier software de hojas de cálculo como Microsoft Excel, Google Sheets o Apple Numbers. Puede elegir este formato en las opciones de exportación.',
					longUpload: 'La carga puede ser larga para archivos grandes (más de 500 elementos), por favor sea paciente.',
					uploadFinished: '¡Carga finalizada!',
					close: 'Cerrar',
					summary: 'Resumen',
					boxCreated: 'La caja n.º{{id}} se creó con éxito.',
					download: 'Descargar {{item}}',
					report: 'Informe',
					username: 'Nombre de Usuario',
					invalidUsername: 'Nombre de usuario no válido',
					usernameRequired: 'Se requiere nombre de usuario',
					reportNotAvailableOnMobile: 'Los informes no están disponibles en dispositivos móviles. Utilice un navegador de escritorio para acceder a esta función.',
					scansPerDate: 'Escaneos por fecha',
					progressFunnel: 'Embudo de progreso',
					scannedAtLeastOnce: 'Escaneado al menos una vez',
					total: 'Total',
					notAuthorized: 'No está autorizado a ver este contenido.',
					error: 'Error',
					insights: 'Estadísticas',
					yourInsightsAreCurrently: 'Tus estadísticas son actualmente',
					public: 'públicas',
					private: 'privadas',
					make: 'Hacer',
					copied: '¡Copiado!',
					accessLink: 'Enlace de acceso',
					neverScanned: 'Nunca escaneado',
					notScanned: 'No escaneado',
					scanned: 'Escaneado',
					filterOptions: 'Opciones de filtro',
					progress: 'Progreso',
					any: 'Cualquiera',
					all: 'Todos',
					columnOrder: 'Orden de las columnas',
					printableLabels: 'Etiquetas imprimibles',
					printableLabelsDetail: 'Descarga las cajas como etiquetas con códigos QR para imprimir',
					endOfDeliveryReport: 'Informe de fin de entrega',
					endOfDeliveryReportDetail: 'Descarga un informe con, para cada caja, el id, la escuela, si llegó al destino final, y si es así la fecha del escaneo',
				}
			},
			de: {
				translation: {
					description: 'Verfolgen und verfolgen Sie Pakete einfach mit unserer fortgeschrittenen Webanwendung. Bleiben Sie in Echtzeit über den Status und den Standort Ihrer Sendungen informiert. Überwachen Sie den Lieferfortschritt mühelos und haben Sie die Gewissheit, jederzeit zu wissen, wo sich Ihre Pakete befinden.',
					home: 'Startseite',
					boxes: 'Kisten',
					scans: 'Scans',
					export: 'Exportieren',
					delete: 'Löschen',
					inprogress: 'In Bearbeitung',
					delivered: 'Zugestellt',
					confusing: 'Verwirrend',
					noscans: 'Keine Scans',
					uploadPrompt: 'Laden Sie Kisten aus einer Verteilerliste hoch',
					noBoxes: 'Keine Kisten gefunden',
					deleteOptions: 'Löschoptionen',
					select: 'Wählen Sie {{option}}',
					waitBoxesLoading: 'Bitte warten Sie, während die Kisten geladen werden...',
					deleteBoxes: 'Kisten löschen',
					confirmDelete: 'Sind Sie sicher, dass Sie mit der Entfernung fortfahren möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
					by: 'Von {{item}}',
					exportOptions: 'Exportoptionen',
					invalidEmail: 'Muss eine gültige E-Mail-Adresse sein',
					emailRequired: 'E-Mail ist erforderlich',
					passwordRequired: 'Passwort ist erforderlich',
					invalidCredentials: 'Ungültige E-Mail-Adresse oder Passwort',
					noAccountYet: 'Sie haben noch keinen Account?',
					register: 'Registrieren',
					email: 'E-Mail-Adresse',
					password: 'Passwort',
					continue: 'Weiter',
					nameRequired: 'Name ist erforderlich',
					alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
					login: 'Anmelden',
					name: 'Name',
					refresh: 'Aktualisieren',
					your: 'Ihr {{item}}',
					youHaveNo: 'Sie haben keine {{item}}.',
					id: 'ID',
					recipient: 'Empfänger',
					status: 'Status',
					project: 'Projekt',
					created: 'Erstellt',
					division: 'Abteilung',
					district: 'Bezirk',
					zone: 'Zone',
					personInCharge: 'Verantwortliche Person',
					phone: 'Telefon',
					institutionType: 'Institutionstyp',
					boxSummary: 'Kastenzusammenfassung',
					deleteBox: 'Diese Box löschen',
					confirmAction: 'Aktion bestätigen',
					cancel: 'Abbrechen',
					confirm: 'Bestätigen',
					informations: 'Informationen',
					progressOverview: 'Fortschrittsübersicht',
					loading: 'Wird geladen...',
					box: 'Kasten',
					location: 'Ort',
					time: 'Zeit',
					comment: 'Kommentar',
					final: 'Endgültig',
					search: 'Suchen...',
					notScannedInThePast_one: 'In den letzten Tag nicht gescannt',
					notScannedInThePast_other: 'In den letzten {{count}} Tagen nicht gescannt',
					thereAreXNeverScanned_one: 'Es gibt {{count}} Kiste, die noch nie gescannt wurde.',
					thereAreXNeverScanned_other: 'Es gibt {{count}} Kisten, die noch nie gescannt wurden.',
					thereAreXDelivered_one: 'Es gibt {{count}} Kiste, die bereits zugestellt wurde.',
					thereAreXDelivered_other: 'Es gibt {{count}} Kisten, die bereits zugestellt wurden.',
					itemsWillBeDeleted_one: '{{count}} Element wird gelöscht.',
					itemsWillBeDeleted_other: '{{count}} Elemente werden gelöscht.',
					itemsWillBeExported_one: '{{count}} Element wird exportiert.',
					itemsWillBeExported_other: '{{count}} Elemente werden exportiert.',
					secondsAgo_one: 'Vor {{count}} Sekunde',
					secondsAgo_other: 'Vor {{count}} Sekunden',
					minutesAgo_one: 'Vor {{count}} Minute',
					minutesAgo_other: 'Vor {{count}} Minuten',
					hoursAgo_one: 'Vor {{count}} Stunde',
					hoursAgo_other: 'Vor {{count}} Stunden',
					daysAgo_one: 'Vor {{count}} Tag',
					daysAgo_other: 'Vor {{count}} Tagen',
					weeksAgo_one: 'Vor {{count}} Woche',
					weeksAgo_other: 'Vor {{count}} Wochen',
					monthsAgo_one: 'Vor {{count}} Monat',
					monthsAgo_other: 'Vor {{count}} Monaten',
					yearsAgo_one: 'Vor {{count}} Jahr',
					yearsAgo_other: 'Vor {{count}} Jahren',
					justNow: 'Gerade eben',
					future: 'In der Zukunft',
					yesterday: 'Gestern',
					tomorrow: 'Morgen',
					lastWeek: 'Letzte Woche',
					nextWeek: 'Nächste Woche',
					lastMonth: 'Letzter Monat',
					nextMonth: 'Nächster Monat',
					lastYear: 'Letztes Jahr',
					nextYear: 'Nächstes Jahr',
					loggedInAs: 'Angemeldet als',
					logout: 'Abmelden',
					drop: 'Loslassen!',
					dragPrompt: 'Klicken Sie hier oder ziehen Sie Dateien hierhin, um sie hochzuladen',
					supportedTypes: 'Unterstützte Dateitypen',
					csvExplanation: 'Eine CSV-Datei kann aus jeder Tabellenkalkulationssoftware wie Microsoft Excel, Google Sheets oder Apple Numbers erstellt werden. Sie können dieses Format in Ihren Exportoptionen auswählen.',
					longUpload: 'Der Upload kann bei großen Dateien (mehr als 500 Elemente) lange dauern, bitte haben Sie Geduld.',
					uploadFinished: 'Upload abgeschlossen!',
					close: 'Schließen',
					summary: 'Zusammenfassung',
					boxCreated: 'Kasten Nr. {{id}} wurde erfolgreich erstellt.',
					download: '{{item}} herunterladen',
					report: 'Report',
					username: 'Benutzername',
					invalidUsername: 'Ungültiger Benutzername',
					usernameRequired: 'Benutzername ist erforderlich',
					reportNotAvailableOnMobile: 'Berichte sind auf Mobilgeräten nicht verfügbar. Bitte verwenden Sie einen Desktop-Browser, um auf diese Funktion zuzugreifen.',
					scansPerDate: 'Scans pro Datum',
					progressFunnel: 'Fortschritts-Trichter',
					scannedAtLeastOnce: 'Mindestens einmal gescannt',
					total: 'Gesamt',
					notAuthorized: 'Sie sind nicht berechtigt, diesen Inhalt zu sehen.',
					error: 'Fehler',
					insights: 'Statistiken',
					yourInsightsAreCurrently: 'Ihre Statistiken sind derzeit',
					public: 'öffentlich',
					private: 'privat',
					make: 'Machen',
					copied: 'Kopiert!',
					accessLink: 'Zugriffslink',
					neverScanned: 'Nie gescannt',
					notScanned: 'Nicht gescannt',
					scanned: 'Gescannt',
					filterOptions: 'Filteroptionen',
					progress: 'Fortschritt',
					any: 'Alle',
					all: 'Alle',
					columnOrder: 'Spaltenreihenfolge',
					printableLabels: 'Druckbare Etiketten',
				}
			}
		},
	});

export default i18n;
