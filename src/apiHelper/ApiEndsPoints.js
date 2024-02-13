export const userEndPoint = {
  LOGIN: "auth/login",
};

export const getUserEndPoint = {
  leads: "admin/get-users",
};

export const editUserEndPoint = {
  DETAILS: "admin/edit-user?type=pos",
  DOCUMENT: "admin/edit-user?type=document",
  BANK: "admin/edit-user?type=bank",
};

export const dashboardEndPoint = {
  DASHBOARD: "admin/dashboard",
};

export const getPermissionDataByTokenEndPoint = {
  PERMISSIONBYTOKEN: "auth/get-user",
};

///pos
export const posEndPoint = {
  GETALLPOS: "admin/get-pos",
  POSDETAILS: "admin/employee-detail",
  actionOnRequest: "admin/pos",
};

export const createPosEndPoint = {
  CREATEPOS: "admin/create-pos",
};
export const getPosAddons = {
  POSADDONS: "pos/addons",
};

export const getPermissionsEndPoint = {
  GETPERMISSION: "admin/get-permission",
};

export const opsLeadsEndPoints = {
  OPSLEADS: "co/get-leads",
  ASSIGNTOME: "co/assign-lead",
  OPSPOOL: "co/get-my-leads",
  OPSDETAILS: "pos/get-lead-detail",
  ZONE: "admin/zone",
  DESIGNATION: "admin/designation",
  DEPARTMENT: "admin/department",
  ROLE: "admin/role",
  STATE: "admin/state",
  DISTRICT: "admin/district",
  MOTORLEADS: "admin/get-motor",
};

export const mastersEndPoint = {
  make: "admin/make",
  model: "admin/model",
  variant: "admin/variant",
  rto: "motor/rto",
  previousInsurer: "admin/previous-insurer",
  pincode: "motor/pincode",
  state: "motor/states",
  bajajMMV: "motor/getBajajMMV",
  hdfcChecksum: "motor/hdfcChecksum",

  getFiancierBanks: "motor/getFiancierBanks",
};
