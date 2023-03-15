const splitEmail = (
  emailString: string | null
): { netId: string | undefined; isUCI: boolean | undefined } => {
  if (emailString && emailString.includes("@")) {
    const [netId, domain] = emailString.split("@", 2);

    if (domain === "uci.edu") {
      return { netId: netId ?? "", isUCI: true };
    } else {
      return { netId: netId ?? "", isUCI: false };
    }
  }

  return { netId: "", isUCI: false };
};

export default splitEmail;
