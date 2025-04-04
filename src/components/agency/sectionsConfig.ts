import { FormField } from './FormSection';
import { SectionType } from './SideMenu';

export interface SectionConfig {
  id: SectionType;
  icon: string;
  label: string;
  fields: FormField[];
  buttonText?: string;
  showPrivacyPolicy?: boolean;
}

const sectionsConfig: SectionConfig[] = [
  {
    id: 'general',
    icon: '📄',
    label: 'Общая информация',
    fields: [
      {
        id: 'agencyName',
        label: 'Название агентства (будет использоваться в качестве названия компании в системе)',
        placeholder: 'Название агентства',
      },
      {
        id: 'officialName',
        label: 'Официальное название (по юр. лицу)',
        placeholder: 'Название',
      },
      {
        id: 'bin',
        label: 'БИН (юридического лица)',
        placeholder: 'БИН',
      },
      {
        id: 'registrationDate',
        label: 'Дата регистрации (юридического лица)',
        placeholder: 'Дата',
        type: 'date',
      },
      {
        id: 'ceoName',
        label: 'ФИО руководителя (юридического лица)',
        placeholder: 'ФИО',
      },
    ],
  },
  {
    id: 'contact',
    icon: '📋',
    label: 'Информация для связи',
    fields: [
      {
        id: 'city',
        label: 'Город (город базирования агентства)',
        placeholder: 'Название города',
      },
      {
        id: 'phone',
        label: 'Телефон (номер телефона для связи с агентством)',
        placeholder: 'Номер телефона',
        type: 'tel',
      },
      {
        id: 'email',
        label: 'E-mail (адрес электронной почты для связи с агентством)',
        placeholder: 'E-mail',
        type: 'email',
      },
      {
        id: 'address',
        label: 'Фактический адрес (адресс офиса агентства)',
        placeholder: 'Улица, дом, номер офиса',
      },
    ],
  },
  {
    id: 'banking',
    icon: '💳',
    label: 'Банковские реквизиты',
    fields: [
      {
        id: 'accountNumber',
        label: 'Расчетный счет',
        placeholder: 'Номер счета',
      },
      {
        id: 'bankBik',
        label: 'БИК банка',
        placeholder: 'Номер',
      },
      {
        id: 'bankName',
        label: 'Название банка',
        placeholder: 'Название банка',
      },
    ],
  },
  {
    id: 'access',
    icon: '🔒',
    label: 'Данные для доступа',
    fields: [
      {
        id: 'username',
        label: 'ФИО (представитель агентства)',
        placeholder: 'Введите ФИО',
      },
      {
        id: 'loginEmail',
        label: 'Email (адрес электронной почты для доступа к системе)',
        placeholder: 'Введите логин',
        type: 'email',
      },
      {
        id: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
        type: 'password',
      },
      {
        id: 'confirmPassword',
        label: 'Повторите пароль',
        placeholder: 'Введите пароль',
        type: 'password',
      },
    ],
    buttonText: 'Зарегистрироваться',
    showPrivacyPolicy: true,
  },
];

export default sectionsConfig; 