package userdto

type ChangeUserRoleResponse struct {
	IsAdmin bool   `json:"is_admin"`
	Message string `json:"message"`
}