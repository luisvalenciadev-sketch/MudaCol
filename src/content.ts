// Todo el contenido editable de la landing de MudaCol.
// Fuentes: prompt_mudacol.md (brief) y las respuestas del cliente del 5 de octubre de 2026
// (resumen en docs/respuestas-cliente.md). No agregar cifras, testimonios ni datos no confirmados.
// Los valores entre corchetes [ ] son marcadores pendientes de confirmar con el cliente.

/**
 * Modo revisión: VITE_SHOW_PENDING=true muestra los datos pendientes como etiquetas amarillas.
 * Por defecto (lanzamiento) se ocultan; cada dato aparece solo cuando se completa aquí.
 */
export const SHOW_PENDING = import.meta.env.VITE_SHOW_PENDING === 'true';

/** Un dato está pendiente mientras sea un marcador entre corchetes, p. ej. "[CIUDAD]". */
export const isPending = (value: string) => value.trim().startsWith('[');

export const PLACEHOLDERS = {
  razonSocial: '[RAZÓN SOCIAL]',
  nit: '[NIT]',
  facebook: '[URL FACEBOOK]',
  ciudad: '[CIUDAD]',
  testimonios: '[TESTIMONIOS: pendiente]',
  mapa: '[MAPA]',
} as const;

const WHATSAPP_NUMBER = '573043113824';

export const contact = {
  whatsappDisplay: '304 311 3824',
  whatsappNumber: WHATSAPP_NUMBER,
  phoneE164: '+573043113824',
  /** Llamadas y WhatsApp usan el mismo número (respuesta del cliente #2) */
  telUrl: 'tel:+573043113824',
  callLabel: 'Llamar',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20MudaCol%2C%20quiero%20cotizar%20mi%20mudanza`,
  address: 'Calle 156 # 7D-75',
  city: PLACEHOLDERS.ciudad,
  /** URL de Google Maps para insertar (Compartir → Insertar un mapa → copiar el src). Vacío = sin mapa. */
  mapEmbedUrl: '',
  email: 'contacto@mudacol.com',
  instagramHandle: '@muda.col',
  instagramUrl: 'https://www.instagram.com/muda.col/',
  facebookName: 'MudaCol',
  facebookUrl: PLACEHOLDERS.facebook,
  schedule: 'Lunes a sábado, 8:00 a. m. – 7:00 p. m.',
  scheduleShort: 'Lun a Sáb: 8:00 a. m. – 7:00 p. m.',
  /** Respuesta del cliente #12 */
  holidays: 'Domingos y festivos: servicio con recargo',
  price: '$500.000 COP',
  payment: 'Efectivo o transferencia bancaria',
  responseTime: 'Respuesta en máximo 24 horas',
};

/** Arma un enlace de WhatsApp con un mensaje libre. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const brand = {
  name: 'MudaCol',
  slogan: 'Tu nuevo comienzo empieza con MudaCol.',
  sloganLine1: 'Tu nuevo comienzo',
  sloganLine2: 'empieza con MudaCol.',
  support: 'Llevamos contigo lo que más valoras.',
  closing: '¡Nos mudamos contigo!',
  pillars: 'Servicio exclusivo · Servicio confiable · Local & Nacional',
};

/** Datos de confianza confirmados por el cliente (respuestas #7, #8 y #9). */
export const trust = [
  { icon: 'workspace_premium', value: '+10', label: 'años de experiencia en el sector de mudanzas' },
  { icon: 'local_shipping', value: '25–50 m³', label: 'vehículos de 25 hasta 50 metros cúbicos' },
  { icon: 'verified_user', value: 'Póliza', label: 'contamos con póliza de seguro de carga' },
];

export type NavItem = { id: string; label: string };

export const nav: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'cobertura', label: 'Cobertura' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { id: 'contacto', label: 'Contacto' },
];

export const ctaLabels = {
  quote: 'Cotiza ahora',
  quoteWhatsapp: 'Cotiza por WhatsApp',
  quoteFree: 'Cotiza gratis',
  talk: 'Hablemos de tu mudanza',
};

export const hero = {
  subtitle: 'Tu mudanza, en manos expertas. Llevamos contigo lo que más valoras.',
  badges: [
    { icon: null, label: 'Mudanzas nacionales dentro de Colombia', tone: 'neutral' },
    { icon: 'workspace_premium', label: 'Más de 10 años de experiencia', tone: 'neutral' },
    { icon: 'local_shipping', label: 'Desde $500.000 COP', tone: 'blue' },
    { icon: 'verified', label: 'Cotización gratuita y sin compromiso', tone: 'green' },
  ] as const,
  features: [
    { icon: 'local_shipping', label: 'Mudanzas locales y nacionales' },
    { icon: 'inventory_2', label: 'Empaque profesional' },
    { icon: 'front_loader', label: 'Cargue y descarga' },
    { icon: 'shield', label: 'Transporte seguro' },
    { icon: 'domain', label: 'Servicio empresarial y residencial' },
  ],
  // Foto de banco (Pexels) aprobada por el cliente; créditos en design/images/pexels/CREDITOS.md
  image: {
    base: '/images/camion-furgon',
    widths: [480, 768, 1024, 1376],
    width: 1376,
    height: 917,
    alt: 'Camión furgón blanco de mudanzas estacionado en una calle',
    captionTitle: 'Servicio exclusivo · Servicio confiable',
    captionText: 'Vehículos de 25 hasta 50 metros cúbicos.',
    captionChip: 'Local & Nacional',
  },
};

export const about = {
  eyebrow: 'Quiénes somos',
  title: 'Quiénes somos',
  text: 'En MudaCol hacemos que tu mudanza sea un proceso más organizado, seguro y sencillo. Ofrecemos servicios de mudanzas residenciales y, de acuerdo con las necesidades del cliente, también atendemos oficinas, pequeños negocios y transporte de artículos individuales. Realizamos mudanzas locales e intermunicipales con cobertura dentro de Colombia, adaptándonos a las características de cada traslado. Nuestro objetivo es acompañarte de principio a fin, cuidando tus pertenencias y brindándote un servicio claro y responsable.',
  quote: 'Mudarse no es solamente trasladar pertenencias. Es comenzar una nueva etapa.',
  quoteFooter: 'MudaCol',
  cards: [
    {
      image: '/images/personal-cargando',
      widths: [640, 960],
      width: 960,
      height: 640,
      alt: 'Dos personas de una empresa de mudanzas cargando un sofá por la calle',
      title: 'Carga y descarga',
      text: 'Nuestro equipo se encarga de la carga en el origen y la descarga en el destino.',
    },
    {
      image: '/images/proteccion-muebles',
      widths: [640, 960],
      width: 960,
      height: 640,
      alt: 'Persona cubriendo un sofá con plástico protector antes de una mudanza',
      title: 'Protección básica de muebles',
      text: 'Protección básica durante el traslado, según cada artículo y el servicio contratado.',
    },
  ],
};

export const services = {
  eyebrow: 'Nuestros servicios',
  title: 'Servicios',
  subtitle: 'Soluciones para hogares, oficinas y pequeños negocios, de acuerdo con las necesidades de cada traslado.',
  cardLink: 'Cotizar',
  items: [
    {
      icon: 'home',
      title: 'Mudanzas residenciales',
      text: 'Trasladamos tus pertenencias desde tu vivienda actual hasta tu nuevo hogar, cuidando cada etapa del proceso.',
    },
    {
      icon: 'corporate_fare',
      title: 'Mudanzas de oficinas y pequeños negocios',
      text: 'Soluciones de traslado para oficinas, pequeños establecimientos y espacios de trabajo, de acuerdo con el volumen y las necesidades del servicio.',
    },
    {
      icon: 'package_2',
      title: 'Transporte de artículos individuales',
      text: 'Para artículos que requieran traslado, previa evaluación de sus características y condiciones.',
    },
    {
      icon: 'front_loader',
      title: 'Carga y descarga',
      text: 'Nuestro equipo se encarga de la carga en el origen y la descarga en el destino.',
    },
    {
      icon: 'chair',
      title: 'Protección básica de muebles',
      text: 'Protección básica durante el traslado, según cada artículo y el servicio contratado.',
    },
    {
      icon: 'build',
      title: 'Desmontaje y montaje',
      text: 'De determinados muebles, cuando haya sido acordado e incluido en la cotización.',
    },
    {
      icon: 'inventory',
      title: 'Empaque',
      text: 'Servicio de empaque completo cuando el cliente lo solicite.',
    },
    {
      icon: 'takeout_dining',
      title: 'Materiales de empaque',
      text: 'Cajas y materiales cuando el cliente lo requiera.',
    },
  ],
};

export const includes = {
  eyebrow: 'Claridad desde el inicio',
  title: 'Qué incluye y qué no incluye',
  included: {
    eyebrow: 'Según lo contratado y cotizado',
    title: 'Qué incluye',
    items: [
      'Carga y descarga',
      'Transporte de origen a destino',
      'Manipulación cuidadosa',
      'Protección básica de muebles',
      'Personal de apoyo',
      'Desmontaje y montaje acordados',
      'Empaque contratado',
      'Cajas y materiales cotizados',
    ],
    noteLabel: 'Nota importante:',
    note: 'Todo servicio adicional debe ser informado y acordado previamente para que pueda ser incluido en la cotización.',
  },
  excluded: {
    eyebrow: 'Salvo que se acuerde y cotice',
    title: 'Qué no incluye',
    items: [
      'Instalación de electrodomésticos',
      'Conexiones eléctricas',
      'Conexiones de gas',
      'Plomería',
      'Limpieza',
      'Trabajos no contemplados en la cotización inicial',
    ],
    highlighted: 'Transporte de artículos prohibidos o peligrosos',
    note: 'Si necesitas alguno de estos servicios, cuéntanoslo al solicitar tu cotización.',
  },
};

export const pricing = {
  eyebrow: 'Precio',
  titleStart: 'Mudanzas desde',
  price: '$500.000 COP',
  /** Valor numérico para la animación de conteo (debe coincidir con price) */
  priceValue: 500000,
  currency: 'COP',
  text: 'El precio final depende de la distancia, volumen de la mudanza, condiciones de acceso, cantidad de personal y servicios adicionales requeridos.',
  minNote: 'El precio mínimo aplica en todas las ciudades.',
  factorsTitle: 'Factores que influyen en tu cotización',
  factors: [
    { icon: 'location_city', label: 'Ciudad y zona de origen y destino' },
    { icon: 'route', label: 'Distancia' },
    { icon: 'inventory_2', label: 'Cantidad y tipo de pertenencias' },
    { icon: 'bedroom_parent', label: 'Número de habitaciones' },
    { icon: 'aspect_ratio', label: 'Volumen' },
    { icon: 'group', label: 'Número de trabajadores' },
    { icon: 'apartment', label: 'Pisos' },
    { icon: 'elevator', label: 'Ascensor' },
    { icon: 'stairs', label: 'Escaleras' },
    { icon: 'handyman', label: 'Desmontaje y montaje' },
    { icon: 'archive', label: 'Empaque' },
    { icon: 'event', label: 'Fecha y horario' },
    { icon: 'verified', label: 'Artículos especiales, frágiles o de valor' },
  ],
  footer: [
    { icon: 'check_circle', label: 'Cotización gratuita y sin compromiso' },
    { icon: 'schedule', label: 'Respuesta en máximo 24 horas' },
    { icon: 'payments', label: 'Pago en efectivo o transferencia bancaria' },
    { icon: 'event', label: 'Domingos y festivos con recargo' },
  ],
};

export const coverage = {
  eyebrow: 'Cobertura',
  title: 'Cobertura dentro de Colombia',
  subtitle: 'Realizamos mudanzas locales e intermunicipales con cobertura dentro de Colombia.',
  baseLabel: 'Ciudad base',
  /** Sede principal (respuesta del cliente #5) */
  mainBase: 'Bogotá',
  mainBaseLabel: 'Sede principal',
  /** Ruta principal a destacar (respuesta del cliente #6) */
  featuredRoute: ['Bogotá', 'Medellín'] as const,
  featuredRouteLabel: 'Ruta principal',
  bases: ['Bogotá', 'Medellín', 'Cali', 'Cartagena'],
  routesTitle: 'Rutas y destinos',
  routesText: 'También atendemos rutas y destinos hacia:',
  destinations: ['Barranquilla', 'Bucaramanga', 'Villavicencio', 'Costa Atlántica'],
  others: 'Y otras ciudades dentro de Colombia, previa disponibilidad.',
  noticeLabel: 'Importante',
  notice: 'Actualmente no ofrecemos mudanzas internacionales.',
  whatsappCta: 'Consulta tu ruta por WhatsApp',
  mapTitle: 'Mapa de cobertura',
  legendBases: 'Ciudades base',
  legendDestinations: 'Rutas y destinos',
  mapHint: 'Pasa el cursor o toca una ciudad para verla en el mapa.',
  regionLabel: 'Costa Atlántica',
  stats: {
    bases: 'Ciudades base',
    destinations: 'Rutas y destinos',
    scopeLabel: 'Alcance',
    scope: 'Local e intermunicipal',
  },
  selectedBase: 'Ciudad base',
  selectedDestination: 'Ruta y destino',
};

export const steps = {
  eyebrow: 'Proceso',
  title: 'Cómo funciona',
  subtitle: 'De la cotización a tu nuevo destino en 7 pasos.',
  items: [
    { title: 'Solicita tu cotización', text: 'Por WhatsApp, teléfono, redes sociales o el formulario.' },
    {
      title: 'Cuéntanos sobre tu mudanza',
      text: 'Origen, destino, fecha, inmueble, pertenencias y requerimientos especiales.',
    },
    { title: 'Envíanos fotos o videos', text: 'Por WhatsApp, para conocer el volumen y las condiciones.' },
    { title: 'Recibe tu cotización', text: 'Gratuita y sin compromiso.' },
    { title: 'Confirma tu fecha', text: 'Al aceptar la cotización se confirman fecha y condiciones.' },
    { title: 'Nos encargamos de la mudanza', text: 'Carga, traslado y descarga según lo contratado.' },
    {
      title: 'Llegamos contigo a tu nuevo destino',
      text: 'Entregamos tus pertenencias en el lugar acordado.',
    },
  ],
};

export const quoteForm = {
  eyebrow: 'Cotización gratuita y sin compromiso',
  title: 'Solicita tu cotización',
  subtitle: 'Completa los bloques y envía tu solicitud por WhatsApp. Un asesor comercial te responderá en máximo 24 horas.',
  steps: ['Contacto', 'Mudanza', 'Inmueble', 'Pertenencias'],
  stepTitles: [
    { title: '1. Datos personales', text: '¿Con quién nos comunicamos para coordinar tu servicio?' },
    { title: '2. Información de la mudanza', text: 'Origen, destino y fecha deseada.' },
    { title: '3. Características del inmueble', text: 'Nos ayuda a planear el acceso y el personal.' },
    { title: '4. Características de la mudanza', text: 'Cuéntanos qué vamos a trasladar.' },
  ],
  cities: ['Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Barranquilla', 'Bucaramanga', 'Villavicencio'],
  otherCity: 'Otra',
  placeholders: {
    fullName: 'Ej. Nombre y apellido',
    phone: 'Ej. 300 123 4567',
    whatsapp: 'Ej. 300 123 4567',
    email: 'nombre@correo.com',
  },
  selectPlaceholder: 'Selecciona…',
  zonePlaceholder: 'Barrio o sector',
  propertyTypes: ['Casa', 'Apartamento', 'Oficina', 'Local', 'Otro'],
  labels: {
    fullName: 'Nombre completo',
    phone: 'Teléfono',
    whatsapp: 'WhatsApp',
    email: 'Correo electrónico',
    originCity: 'Ciudad de origen',
    originCityOther: '¿Cuál ciudad de origen?',
    originZone: 'Zona de origen',
    destCity: 'Ciudad de destino',
    destCityOther: '¿Cuál ciudad de destino?',
    destZone: 'Zona de destino',
    date: 'Fecha deseada',
    propertyType: 'Tipo de propiedad',
    rooms: 'Número de habitaciones',
    originFloor: 'Piso de origen',
    destFloor: 'Piso de destino',
    elevator: '¿Tiene ascensor?',
    stairs: '¿Hay escaleras?',
    accessDifficulty: '¿Existe alguna dificultad especial de acceso?',
    accessDetail: 'Describe la dificultad de acceso',
    furnitureCount: 'Cantidad aproximada de muebles',
    boxesCount: 'Cantidad aproximada de cajas',
    specialItems: 'Declara tus artículos especiales, frágiles o de valor (marca lo que aplique)',
    specialItemsHint: 'Los artículos frágiles o de valor deben declararse antes de la mudanza.',
    disassembly: '¿Necesita desmontaje y montaje?',
    packing: '¿Necesita servicio de empaque?',
    materials: '¿Necesita cajas o materiales de empaque?',
    details: 'Cuéntanos cualquier detalle importante sobre tu mudanza (opcional)',
    filesTitle: 'Fotos y videos',
    filesInfo:
      'Al enviar, se abrirá WhatsApp con tu solicitud. Adjunta ahí fotos o videos de tus pertenencias y espacios: nos ayudan a darte una cotización más precisa.',
    consent: 'Acepto la política de tratamiento de datos personales de MudaCol.',
  },
  specialItems: [
    { key: 'large', label: 'Muebles grandes' },
    { key: 'special', label: 'Artículos especiales' },
    { key: 'fragile', label: 'Artículos frágiles' },
    { key: 'valuable', label: 'Artículos de valor' },
  ] as const,
  specialDetailLabel: 'Detalle',
  yes: 'Sí',
  no: 'No',
  next: 'Siguiente',
  back: 'Atrás',
  submit: 'Enviar solicitud por WhatsApp',
  required: 'Este campo es obligatorio.',
  invalidEmail: 'Escribe un correo válido.',
  invalidPhone: 'Escribe un número válido (mínimo 7 dígitos).',
  invalidDate: 'Elige una fecha a partir de hoy.',
  invalidNumber: 'Escribe un número (0 o más).',
  consentRequired: 'Debes aceptar la política de tratamiento de datos.',
  errorSummary: 'Revisa los campos marcados para continuar.',
  successTitle: '¡Tu solicitud está lista en WhatsApp!',
  success: 'Envía el mensaje en WhatsApp para completarla. Un asesor comercial te responderá en máximo 24 horas.',
  successPhotos: 'Recuerda adjuntar en el chat las fotos o videos de tus pertenencias.',
  successWhatsapp: 'Abrir WhatsApp de nuevo',
  newRequest: 'Hacer otra solicitud',
  requiredHint: 'Los campos con * son obligatorios.',
  /** Encabezados del mensaje que recibe el asesor por WhatsApp */
  message: {
    greeting: 'Hola MudaCol, quiero solicitar una cotización para mi mudanza.',
    contact: 'DATOS DE CONTACTO',
    move: 'MUDANZA',
    property: 'INMUEBLE',
    belongings: 'PERTENENCIAS',
    special: 'Artículos declarados',
    noSpecial: 'Ninguno',
    details: 'Detalles',
    photos: 'Adjunto fotos o videos en este chat.',
    consent: 'Acepto la política de tratamiento de datos personales.',
    source: 'Origen de la visita',
  },
};

export const policies = {
  eyebrow: 'Antes de contratar',
  title: 'Políticas importantes',
  subtitle: 'Condiciones claras para que sepas qué esperar de tu servicio.',
  items: [
    {
      icon: 'dangerous',
      tone: 'danger',
      title: 'Artículos que no transportamos',
      text: 'Armas de ningún tipo, drogas o sustancias ilícitas, químicos peligrosos, sustancias potencialmente peligrosas y materiales que representen riesgo para las personas, el vehículo o las demás pertenencias.',
    },
    {
      icon: 'diamond',
      tone: 'default',
      title: 'Objetos frágiles, delicados y de valor',
      text: 'El cliente debe declararlos antes de la mudanza en el formulario de cotización. Si se daña un objeto no declarado, MudaCol no asumirá responsabilidad.',
    },
    {
      icon: 'verified_user',
      tone: 'default',
      title: 'Responsabilidad por daños',
      text: 'MudaCol responde por daños causados directamente por su personal en artículos declarados y dentro de las condiciones contratadas. Al finalizar el servicio, nuestros auxiliares de carga revisan contigo que todo esté en buen estado; cualquier daño debe informarse durante el servicio o en esa revisión final. Contamos con póliza de seguro de carga.',
    },
    {
      icon: 'event_available',
      tone: 'default',
      title: 'Reserva y anticipo',
      text: 'Mudanzas de ciudad a ciudad: para confirmar la fecha se paga un anticipo del 50%. Mudanzas dentro de la misma ciudad: el valor total se paga al finalizar el servicio. Reserva recomendada con 24 a 72 horas de anticipación para mudanzas locales; las intermunicipales pueden requerir más.',
    },
    {
      icon: 'home_work',
      tone: 'default',
      title: 'Visita a domicilio',
      text: 'Solo para mudanzas grandes o complejas; las pequeñas y medianas se cotizan con información, fotos y videos.',
    },
    {
      icon: 'cancel',
      tone: 'default',
      title: 'Cancelación del cliente',
      text: 'Dentro de las primeras 24 horas desde que recibió la cotización puede optar por la devolución de su anticipo; después, se devuelve el 50% y el otro 50% no es reembolsable. Devolución en máximo 24 horas.',
    },
    {
      icon: 'currency_exchange',
      tone: 'default',
      title: 'Cancelación por parte de MudaCol',
      text: 'Devolución del 100% del anticipo en máximo 24 horas desde la confirmación de la cancelación.',
    },
  ] as const,
};

export const faq = {
  eyebrow: 'Resolvemos tus dudas',
  title: 'Preguntas frecuentes',
  subtitle: 'Todo lo que necesitas saber antes de confirmar tu servicio con MudaCol.',
  items: [
    {
      q: '¿Cuánto cuesta una mudanza con MudaCol?',
      a: 'Las mudanzas tienen un precio mínimo de $500.000 COP, que aplica en todas las ciudades. El precio final depende de la distancia, volumen, personal requerido, condiciones de acceso y servicios adicionales.',
    },
    { q: '¿La cotización tiene algún costo?', a: 'No. La cotización es gratuita y sin compromiso.' },
    { q: '¿Realizan mudanzas entre ciudades?', a: 'Sí. MudaCol realiza mudanzas dentro de Colombia.' },
    { q: '¿Realizan mudanzas internacionales?', a: 'Actualmente no ofrecemos mudanzas internacionales.' },
    { q: '¿Puedo solicitar la cotización por WhatsApp?', a: 'Sí. Escríbenos o llámanos al 304 311 3824.' },
    {
      q: '¿Atienden domingos y festivos?',
      a: 'Sí, con recargo. Nuestro horario de atención es de lunes a sábado, de 8:00 a. m. a 7:00 p. m.',
    },
    {
      q: '¿Necesitan visitar mi vivienda antes de cotizar?',
      a: 'No siempre. Muchas mudanzas pueden cotizarse mediante información, fotografías y videos. Para servicios grandes o complejos podemos solicitar una visita previa.',
    },
    {
      q: '¿Qué información necesito enviar?',
      a: 'Origen, destino, fecha, inmueble, volumen aproximado, accesos y cualquier artículo especial.',
    },
    {
      q: '¿Es necesario enviar fotos o videos?',
      a: 'No siempre es obligatorio, pero se recomienda porque nos permite realizar una estimación más precisa.',
    },
    { q: '¿Puedo contratar el servicio de empaque?', a: 'Sí, de acuerdo con las necesidades del cliente.' },
    {
      q: '¿MudaCol proporciona cajas?',
      a: 'Sí. Podemos suministrar cajas y materiales de empaque cuando el cliente lo solicite y estos sean incluidos en la cotización.',
    },
    {
      q: '¿Transportan artículos frágiles o de valor?',
      a: 'Sí, siempre que sean previamente declarados por el cliente en el formulario de cotización y puedan ser transportados bajo las condiciones del servicio.',
    },
    {
      q: '¿Qué ocurre si no declaro un artículo frágil o de valor?',
      a: 'Los daños a artículos no declarados no serán responsabilidad de MudaCol.',
    },
    { q: '¿Qué formas de pago aceptan?', a: 'Efectivo y transferencia bancaria.' },
    {
      q: '¿Cuánto se paga de anticipo?',
      a: 'En mudanzas de ciudad a ciudad, el 50% para confirmar la fecha. En mudanzas dentro de la misma ciudad no hay anticipo: el valor total se paga al finalizar el servicio.',
    },
    {
      q: '¿Tienen seguro de carga?',
      a: 'Sí. Contamos con póliza de seguro de carga. Las condiciones de responsabilidad se explican en nuestras políticas.',
    },
    {
      q: '¿Puedo cancelar mi reserva?',
      a: 'Sí. Dentro de las primeras 24 horas desde la recepción de la cotización puedes optar por la devolución de tu anticipo. Después se devuelve el 50% y el 50% restante no es reembolsable.',
    },
    { q: '¿Cuándo recibiré mi devolución?', a: 'En un plazo máximo de 24 horas.' },
    {
      q: '¿Qué pasa si MudaCol cancela mi servicio?',
      a: 'MudaCol devolverá el 100% del anticipo en un plazo máximo de 24 horas.',
    },
    {
      q: '¿Qué artículos no transportan?',
      a: 'Armas, drogas o sustancias ilícitas, químicos peligrosos ni sustancias potencialmente peligrosas.',
    },
  ],
};

export type Testimonial = { name: string; text: string; service?: string };

export const testimonials = {
  eyebrow: 'Clientes',
  title: 'Lo que dicen nuestros clientes',
  placeholder: PLACEHOLDERS.testimonios,
  note: 'Este espacio se completará con testimonios reales de clientes de MudaCol (pendiente: recibir los textos autorizados).',
  /**
   * Testimonios reales con autorización del cliente (respuesta #20). Mientras esté vacío,
   * la sección no se muestra en lanzamiento. Ejemplo:
   * { name: 'Nombre Apellido', text: 'Texto del testimonio…', service: 'Mudanza Bogotá – Medellín' }
   */
  items: [] as Testimonial[],
};

export const contactCta = {
  title: '¿Estás listo para tu nuevo comienzo?',
  text: 'MudaCol está listo para acompañarte. Solicita tu cotización gratuita y cuéntanos qué necesitas trasladar.',
  closing: '¡Nos mudamos contigo!',
};

export const footer = {
  navTitle: 'Navegación',
  contactTitle: 'Contacto',
  paymentTitle: 'Formas de pago',
  whatsappCta: 'Escríbenos por WhatsApp',
  /** Cuando existan las páginas, poner su enlace en href y pending: false */
  legal: [
    { label: 'Política de tratamiento de datos', href: '#', pending: true },
    { label: 'Términos del servicio', href: '#', pending: true },
  ],
  pendingLabel: '(página pendiente)',
  /** Respuesta del cliente #1: se completa cuando la empresa esté registrada */
  razonSocial: PLACEHOLDERS.razonSocial,
  nit: PLACEHOLDERS.nit,
  copyright: '© 2026 MudaCol. Todos los derechos reservados.',
};
