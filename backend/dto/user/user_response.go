package userdto

type ChangeUserRoleResponse struct {
	IsAdmin bool   `json:"is_admin"`
	Token   string `json:"token"`
	Message string `json:"message"`
}