function getStanza(value, type) {
  switch(type) {
    case 'recipient':
      return {"term":{"recipient":{"value":value}}};
    case 'year':
      if(value.startsWith('before')) {
        return {"range":{"year":{"lte":value.split(' ')[1]}}};
      } else if(value.startsWith('after')) {
        return {"range":{"year":{"gte":value.split(' ')[1]}}};
      }
      const rangeEnds = value.split('–'); /* NB: the ndash here b/c pretentious */
      return {"range":{"year":{"gte":rangeEnds[0],"lte":rangeEnds[1]}}};
    case 'continent':
      return {"term":{"continent":{"value":value}}};
    default:
      return;
  }
}

export function filterStanzaFactory(facetType, filterObj) {
  let statement = filterObj[facetType].map((value, type) => {
    return getStanza(value, facetType);
  });

  if (statement.length === 0) {
    return;
  }

  return statement;
}
