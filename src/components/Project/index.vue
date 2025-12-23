<template>
  <div class="project">
    <Filters :filters="filters" />
    <ProjectTable :head="tableHead" :body="tableBody" :foot="tableFoot" />
    <Pagination
      :page="page"
      :limit="limit"
      :total="total"
      @update:page="onPageChange"
      @reload="onReload"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Filters from '@/components/Filters/index.vue';
import ProjectTable from '@/components/Project/Table.vue';
import Pagination from '@/components/Pagination/index.vue';

defineOptions({
  name: 'Project',
});

// >>> pagination
const page = ref(1);
const limit = ref(5);
const total = computed(() => tableBody.value.length);

const onPageChange = value => {
  page.value = value;
};
const onReload = () => {
  page.value = 1;
};

// >>> table
const users = ref([]);
const agents = ref([]);
const sponsors = ref([]);
const statuses = ref([]);
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
// re-check !!!
const tableBody = computed(() => {
  return users.value.map(user => {
    return tableHead.map(column => {
      let value = user[column.slug] || '';

      // Map agent and sponsor IDs to names
      if (column.slug === 'agent' && user.agentId) {
        const agent = agents.value.find(a => a.id === user.agentId);
        value = agent?.surname || '';
      } else if (column.slug === 'sponsor' && user.sponsorId) {
        const sponsor = sponsors.value.find(s => s.id === user.sponsorId);
        value = sponsor?.surname || '';
      }

      return {
        slug: column.slug,
        name: String(value),
      };
    });
  });
});
const tableFoot = computed(() => {
  return [
    {
      slug: 'count',
      name: `Count: ${users.value.length}`,
      colspan: Math.ceil(tableHead.length / 2),
    },
    {
      slug: 'total',
      name: `Total: ${users.value.reduce((acc, i) => acc + i.debtAmount, 0)}`,
      colspan: Math.ceil(tableHead.length / 2),
    },
  ];
});

// >>> filters
const rawFilters = ref([
  {
    value: '',
    idx: 'surname',
    name: 'surname',
    placeholder: 'По фамилии',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'name',
    name: 'name',
    placeholder: 'По имени',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'patronymic',
    name: 'patronymic',
    placeholder: 'По отчеству',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'fullname',
    name: 'fullname',
    placeholder: 'По ФИО',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'passport',
    name: 'passport',
    placeholder: 'По паспорту',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'phone',
    name: 'phone',
    placeholder: 'По телефону',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'email',
    name: 'email',
    placeholder: 'По емейлу',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'id',
    name: 'id',
    placeholder: 'По id',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'contractNumber',
    name: 'contractNumber',
    placeholder: 'По № договора',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'lei',
    name: 'lei',
    placeholder: 'По ИНН',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'agent',
    name: 'agent',
    placeholder: 'Агент',
    filterType: 'sorting',
  },
  {
    value: '',
    idx: 'status',
    name: 'status',
    placeholder: 'Операционный статус',
    filterType: 'sorting',
  },
  {
    value: '',
    idx: 'productionNumber',
    name: 'productionNumber',
    placeholder: 'По № производства',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'debtAmount',
    name: 'debtAmount',
    placeholder: 'По залогам',
    filterType: 'search',
  },
  {
    value: '',
    idx: 'sponsor',
    name: 'sponsor',
    placeholder: 'По поручителям',
    filterType: 'search',
  },
]);

const filters = computed(() => {
  return rawFilters.value.map(filter => {
    if (filter.filterType === 'sorting') {
      if (filter.name === 'agent') {
        return {
          ...filter,
          options: agents.value.map(agent => ({
            value: agent.id,
            text: agent.surname,
          })),
        };
      }
      if (filter.name === 'status') {
        return {
          ...filter,
          options: statuses.value.map(status => ({
            value: status.slug,
            text: status.name,
          })),
        };
      }
      return {
        ...filter,
      };
    }
    return {
      ...filter,
    };
  });
});

// >>> api requests
const fetchUsers = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const usersData = await import('@/seeders/users.json');
    users.value = usersData.users;
    console.log('fetched users:', users.value);
  } catch (error) {
    console.error('Error loading users:', error);
  }
};
const fetchAgents = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const agentsData = await import('@/seeders/agents.json');
    agents.value = agentsData.agents;
    console.log('fetched agents:', agents.value);
  } catch (error) {
    console.error('Error loading users:', error);
  }
};
const fetchSponsors = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const sponsorsData = await import('@/seeders/sponsors.json');
    sponsors.value = sponsorsData.sponsors;
    console.log('fetched sponsors:', sponsors.value);
  } catch (error) {
    console.error('Error loading sponsors:', error);
  }
};
const fetchStatuses = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const statusData = await import('@/seeders/statuses.json');
    statuses.value = statusData.statuses;
    console.log('fetched statuses:', statuses.value);
  } catch (error) {
    console.error('Error loading statuses:', error);
  }
};
const fetchData = async () => {
  await Promise.all([fetchUsers(), fetchAgents(), fetchSponsors(), fetchStatuses()]);
  // await fetchUsers();
  // await fetchAgents();
  // await fetchSponsors();
  // await fetchStatuses();
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped lang="scss">
.project {
  padding: 16px;
  display: flex;
  flex-direction: column;

  .filters {
    margin-bottom: 20px;
  }
}
</style>
