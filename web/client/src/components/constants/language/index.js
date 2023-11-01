import { ReactComponent as GbFlag } from './flags/gb.svg';
import { ReactComponent as FrFlag } from './flags/fr.svg';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languages = [
	{ label: 'English', code: 'en', flag: <GbFlag /> },
	{ label: 'Français', code: 'fr', flag: <FrFlag /> },
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
					itemsWillBeDeleted: '{{number}} items will be deleted.',
					waitBoxesLoading: 'Please wait while the boxes are loading...',
					deleteBoxes: 'Delete boxes',
					confirmDelete: 'Are you sure you want to proceed to the removal? This action cannot be undone.',
					by: 'By {{item}}',
					exportOptions: 'Export options',
					itemsWillBeExported: '{{number}} items will be exported.',
					invalidEmail: 'Must be a valid email',
					emailRequired: 'Email is required',
					passwordRequired: 'Password is required',
					invalidCredentials: 'Invalid email or password',
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
					justNow: 'Just now',
					future: 'In the future',
					yesterday: 'Yesterday',
					tomorrow: 'Tomorrow',
					secondsAgo: '{{seconds}} seconds ago',
					minuteAgo: '{{minute}} minute ago',
					minuteFromNow: 'in {{minute}} minute',
					hourAgo: '{{hour}} hour ago',
					hourFromNow: 'in {{hour}} hour',
					lastWeek: 'Last week',
					nextWeek: 'Next week',
					lastMonth: 'Last month',
					nextMonth: 'Next month',
					lastYear: 'Last year',
					nextYear: 'Next year',
					daysAgo: '{{days}} days ago',
					weeksAgo: '{{weeks}} weeks ago',
					monthsAgo: '{{months}} months ago',
					yearsAgo: '{{years}} years ago',
					loggedInAs: 'Logged in as',
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
					noscans: 'Aucun',
					uploadPrompt: 'Uploadez des boîtes depuis une liste de distribution',
					noBoxes: 'Aucune boîte trouvée',
					deleteOptions: 'Options de suppression',
					select: 'Sélectionner {{option}}',
					itemsWillBeDeleted: '{{number}} éléments seront supprimés.',
					waitBoxesLoading: 'Veuillez patienter pendant que les boîtes chargent...',
					deleteBoxes: 'Supprimer les boîtes',
					confirmDelete: 'Êtes-vous sûr de vouloir procéder à la suppression ? Cette action est irréversible.',
					by: 'Par {{item}}',
					exportOptions: 'Options d\'exportation',
					itemsWillBeExported: '{{number}} éléments seront exportés.',
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
					justNow: 'À l\'instant',
					future: 'À l\'avenir',
					yesterday: 'Hier',
					tomorrow: 'Demain',
					secondsAgo: 'il y a {{seconds}} secondes',
					minuteAgo: 'il y a {{minute}} minutes',
					minuteFromNow: 'dans {{minute}} minute',
					hourAgo: 'il y a {{hour}} heures',
					hourFromNow: 'dans {{hour}} heures',
					lastWeek: 'la semaine dernière',
					nextWeek: 'la semaine prochaine',
					lastMonth: 'le mois dernier',
					nextMonth: 'le mois prochain',
					lastYear: 'l\'année dernière',
					nextYear: 'l\'année prochaine',
					daysAgo: 'il y a {{days}} jours',
					weeksAgo: 'il y a {{weeks}} semaines',
					monthsAgo: 'il y a {{months}} mois',
					yearsAgo: 'il y a {{years}} ans',
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
					itemsWillBeDeleted: '{{number}} elementos serán eliminados.',
					waitBoxesLoading: 'Espere mientras se cargan las cajas...',
					deleteBoxes: 'Eliminar Cajas',
					confirmDelete: '¿Está seguro de que desea proceder con la eliminación? Esta acción no se puede deshacer.',
					by: 'Por {{item}}',
					exportOptions: 'Opciones de Exportación',
					itemsWillBeExported: '{{number}} elementos serán exportados.',
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
					your: 'Tu {{item}}',
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
					justNow: 'Justo ahora',
					future: 'En el futuro',
					yesterday: 'Ayer',
					tomorrow: 'Mañana',
					secondsAgo: 'Hace {{seconds}} segundos',
					minuteAgo: 'Hace {{minute}} minuto',
					minuteFromNow: 'en {{minute}} minuto',
					hourAgo: 'Hace {{hour}} hora',
					hourFromNow: 'en {{hour}} hora',
					lastWeek: 'La semana pasada',
					nextWeek: 'La próxima semana',
					lastMonth: 'El mes pasado',
					nextMonth: 'El próximo mes',
					lastYear: 'El año pasado',
					nextYear: 'El próximo año',
					daysAgo: 'Hace {{days}} días',
					weeksAgo: 'Hace {{weeks}} semanas',
					monthsAgo: 'Hace {{months}} meses',
					yearsAgo: 'Hace {{years}} años',
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
					itemsWillBeDeleted: '{{number}} Elemente werden gelöscht.',
					waitBoxesLoading: 'Bitte warten Sie, während die Kisten geladen werden...',
					deleteBoxes: 'Kisten löschen',
					confirmDelete: 'Sind Sie sicher, dass Sie mit der Entfernung fortfahren möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
					by: 'Von {{item}}',
					exportOptions: 'Exportoptionen',
					itemsWillBeExported: '{{number}} Elemente werden exportiert.',
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
					justNow: 'Gerade eben',
					future: 'In der Zukunft',
					yesterday: 'Gestern',
					tomorrow: 'Morgen',
					secondsAgo: 'Vor {{seconds}} Sekunden',
					minuteAgo: 'Vor {{minute}} Minute',
					minuteFromNow: 'in {{minute}} Minute',
					hourAgo: 'Vor {{hour}} Stunde',
					hourFromNow: 'in {{hour}} Stunde',
					lastWeek: 'Letzte Woche',
					nextWeek: 'Nächste Woche',
					lastMonth: 'Letzter Monat',
					nextMonth: 'Nächster Monat',
					lastYear: 'Letztes Jahr',
					nextYear: 'Nächstes Jahr',
					daysAgo: 'Vor {{days}} Tagen',
					weeksAgo: 'Vor {{weeks}} Wochen',
					monthsAgo: 'Vor {{months}} Monaten',
					yearsAgo: 'Vor {{years}} Jahren',
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
				}
			}
		},
	});

export default i18n;
