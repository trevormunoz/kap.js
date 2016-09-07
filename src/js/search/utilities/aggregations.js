const decades = {
  "range": {
    "field": "year",
    "ranges": [
      {"key": "before 1920", "to": 1920},
      {"key": "1920–1929", "from": 1920, "to": 1929},
      {"key": "1930–1939", "from": 1930, "to": 1939},
      {"key": "1940–1949", "from": 1940, "to": 1949},
      {"key": "1950–1959", "from": 1950, "to": 1959},
      {"key": "1960–1969", "from": 1960, "to": 1969},
      {"key": "after 1970", "from": 1970, "to": 1979}
    ]
  }
};

const recipients = {
  "terms": {
    "field": "recipient",
    "size": 0
  }
};

const locations = {
  "terms": {
    "field": "continent",
    "size": 10
  }
};

const aggs = {
  decades,
  recipients,
  locations
}

export const aggregations = {"aggregations": aggs };
