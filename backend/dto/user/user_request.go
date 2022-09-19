package userdto

type ChangeUserRoleRequest struct {
	IsAdmin bool `json:"is_admin"`
}