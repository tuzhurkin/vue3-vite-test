import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useProcessUsers = () => {
  const route = useRoute();
  const router = useRouter();

  const loading = ref(false);
  const users = ref([]);

  // pagination
  const defaultPage = 1;
  const defaultLimit = 5;
  const page = ref(defaultPage);
  const limit = ref(defaultLimit);
  const total = computed(() => filteredUsers.value.length);
  const currentPageCount = computed(() =>
    limit.value * page.value > total.value ? total.value : limit.value * page.value
  );
  const isDataEmpty = computed(() => !filteredUsers.value.length);
  const setPage = value => {
    page.value = value;
  };
  const resetPage = () => {
    page.value = defaultPage;
  };
  const setLimit = value => {
    limit.value = value;
    resetPage();
  };
  const resetLimit = () => {
    limit.value = defaultLimit;
    resetPage();
  };

  // filters for searching and sorting users
  const filtersData = ref([
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
      options: [
        {
          value: 1,
          text: 'Агент 001',
        },
        {
          value: 2,
          text: 'Агент 002',
        },
        {
          value: 3,
          text: 'Агент 003',
        },
      ],
    },
    {
      value: '',
      idx: 'status',
      name: 'status',
      placeholder: 'Операционный статус',
      filterType: 'sorting',
      options: [
        {
          value: 'active',
          text: 'Активний',
        },
        {
          value: 'inactive',
          text: 'Неактивний',
        },
        {
          value: 'completed',
          text: 'Завершений',
        },
        {
          value: 'paused',
          text: 'Призупинений',
        },
        {
          value: 'cancelled',
          text: 'Скасований',
        },
      ],
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

  // filters values for users filtering
  const filters = computed(() => {
    return filtersData.value.reduce((acc, filter) => {
      acc[filter.idx] = filter.value;
      return acc;
    }, {});
  });

  // filtered users by filters values
  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      return Object.entries(filters.value).every(([key, value]) => {
        if (!value) return true;
        return String(user[key] || '')
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });
  });

  // paginated users by page and limit
  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return filteredUsers.value.slice(start, end);
  });

  // filter buttons handlers
  const onApplyFilters = appliedFilters => {
    appliedFilters.forEach(appliedFilter => {
      const filter = filtersData.value.find(f => f.idx === appliedFilter.idx);
      if (filter) filter.value = appliedFilter.value;
    });
    resetPage();
    setFiltersToURL();
  };

  const onResetFilters = () => {
    filtersData.value.forEach(filter => {
      if (filter.filterType === 'search') filter.value = '';
    });
    resetPage();
    setFiltersToURL();
  };

  const onResetSortings = () => {
    filtersData.value.forEach(filter => {
      if (filter.filterType === 'sorting') filter.value = '';
    });
    resetPage();
    setFiltersToURL();
  };

  watch(total, value => {
    if (limit.value > value || value === 0) resetLimit();
  });

  // set filters from URL query parameters on page load
  const loadFiltersFromURL = () => {
    const query = route.query;
    filtersData.value.forEach(filter => {
      if (query[filter.idx]) filter.value = query[filter.idx];
    });
  };

  // set filters to URL query parameters on filter change
  const setFiltersToURL = () => {
    const query = {};
    filtersData.value.forEach(filter => {
      if (filter.value) query[filter.idx] = filter.value;
    });
    router.push({ query });
  };

  // mocked api request to fetch users
  const fetchUsers = async () => {
    loading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const usersData = await import('@/seeders/users.json');
      users.value = usersData.users;
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    loadFiltersFromURL();
    await fetchUsers();
  });

  return {
    users,
    loading,
    page,
    limit,
    total,
    currentPageCount,
    isDataEmpty,
    setPage,
    resetPage,
    setLimit,
    resetLimit,
    filtersData,
    filters,
    filteredUsers,
    paginatedUsers,
    onApplyFilters,
    onResetFilters,
    onResetSortings,
  };
};
