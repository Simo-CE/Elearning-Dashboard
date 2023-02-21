const DropdownResults = (options = [], appendAll = false) => {
  let transformedOptions = [];
  if (options?.length) {
    transformedOptions = options.map((data) =>
      appendAll
        ? Object.assign({}, data, { value: data?.id }, { label: data?.name })
        : Object.assign({}, { value: data?.id }, { label: data?.name })
    );
  }

  return transformedOptions;
};

export default DropdownResults;
