export function objectToFormData(
  data: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
) {
  if (typeof data === "object" && data !== null && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      objectToFormData(value, formData, newKey);
    });
  } else {
    formData.append(parentKey, data);
  }

  return formData;
}
