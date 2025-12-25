import { computed } from 'vue';

export const useTableContents = (paginatedUsers, currentPageCount, total) => {
  const tableHead = [
    {
      id: 1,
      name: 'Id',
      slug: 'id',
    },
    {
      id: 2,
      name: 'Емейл',
      slug: 'email',
    },
    {
      id: 3,
      name: 'Кредитор',
      slug: 'sponsor',
    },
    {
      id: 4,
      name: 'Позивач',
      slug: 'agent',
    },
    {
      id: 5,
      name: 'Дата кредита',
      slug: 'creditDate',
    },
    {
      id: 6,
      name: 'Фамилия',
      slug: 'surname',
    },
    {
      id: 7,
      name: 'Имя',
      slug: 'name',
    },
    {
      id: 8,
      name: 'Отчество',
      slug: 'patronymic',
    },
    {
      id: 9,
      name: 'Возраст',
      slug: 'age',
    },
    {
      id: 10,
      name: 'Сумма долга',
      slug: 'debtAmount',
    },
    {
      id: 11,
      name: 'Телефон',
      slug: 'phone',
    },
    {
      id: 12,
      name: 'Емейл',
      slug: 'email',
    },
    {
      id: 13,
      name: 'Операционный статус',
      slug: 'status',
    },
    {
      id: 14,
      name: 'Паспорт',
      slug: 'passport',
    },
    {
      id: 15,
      name: 'Номер договора',
      slug: 'contractNumber',
    },
    {
      id: 16,
      name: 'Номер производства',
      slug: 'productionNumber',
    },
    {
      id: 17,
      name: 'ИНН',
      slug: 'lei',
    },
  ];

  const tableBody = computed(() => {
    return paginatedUsers.value.map(user => {
      return tableHead.map(column => {
        const value = user[column.slug];
        const displayValue =
          value && typeof value === 'object' && value.text ? value.text : value || '-';

        return {
          slug: column.slug,
          name: String(displayValue),
        };
      });
    });
  });

  const tableFoot = computed(() => {
    const countColspan = 3; // Math.ceil(tableHead.length / 2)
    const totalColspan = tableHead.length - countColspan;
    return [
      {
        slug: 'count',
        name: `Count: ${currentPageCount.value}`,
        colspan: countColspan,
      },
      {
        slug: 'total',
        name: `Total: ${total.value}`,
        colspan: totalColspan,
      },
    ];
  });

  return {
    tableHead,
    tableBody,
    tableFoot,
  };
};
