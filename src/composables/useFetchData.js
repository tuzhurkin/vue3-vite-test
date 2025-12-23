import { ref, onMounted, watch, toValue } from 'vue';

export const useFetchData = (page, limit) => {
  const users = ref([]);
  const agents = ref([]);
  const sponsors = ref([]);
  const statuses = ref([]);
  const totalUsers = ref(0);
  const allUsers = ref([]);
  const loading = ref(false);

  const fetchAllUsers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const usersData = await import('@/seeders/users.json');
      allUsers.value = usersData.users;
      totalUsers.value = usersData.users.length;
      console.log('fetched all users:', allUsers.value.length);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const getPaginatedUsers = () => {
    const pageValue = toValue(page);
    const limitValue = toValue(limit);
    const start = (pageValue - 1) * limitValue;
    const end = start + limitValue;
    users.value = allUsers.value.slice(start, end);
  };

  watch([page, limit], () => {
    if (allUsers.value.length > 0) {
      getPaginatedUsers();
    }
  });

  const fetchAgents = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const agentsData = await import('@/seeders/agents.json');
      agents.value = agentsData.agents;
      console.log('fetched agents:', agents.value);
    } catch (error) {
      console.error('Error loading agents:', error);
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
    loading.value = true;
    await Promise.all([fetchAllUsers(), fetchAgents(), fetchSponsors(), fetchStatuses()]);
    getPaginatedUsers();
    loading.value = false;
  };

  onMounted(async () => {
    await fetchData();
  });

  return { users, agents, sponsors, statuses, totalUsers, loading };
};
