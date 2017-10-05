export const formatGroups = groups => groups.map(group => formatGroup(group));

export const formatGroup = (group = {}) => ({
  id: group.id,
  name: group.name
});
