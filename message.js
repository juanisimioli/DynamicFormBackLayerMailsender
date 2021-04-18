const isValidFile = (file) => {
  if (
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return [
      {
        filename: file.name,
        type: file.type,
        path: file.path,
      },
    ];
  } else {
    return [
      {
        filename: "INVALID FILE TYPE",
      },
    ];
  }
};

const htmlFormData = (formData) => {
  return Object.entries(formData)
    .filter(([key]) => key !== "titleForm")
    .map(([key, value]) => {
      if (key === "File" || key === "OptionSelected") {
        return null;
      }
      return `<div>
              <b>${key}</b> : ${value.toString()}
            </div>`;
    })
    .join("");
};

const message = (formData, file) => ({
  from: process.env.MAIL_FORM_SMPT_USER,
  to: formData.Email,
  subject: `DYNAMIC FORM/ ${formData.titleForm} (LAMBDA)`,
  html: `<b>${formData.titleForm} FIELDS:</b>
        ${htmlFormData(formData)}`,
  attachments: file && isValidFile(file),
});

module.exports = {
  message: message,
};
