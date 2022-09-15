package profiledto

type ProfileResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Photo    string `json:"photo" validate:"required"`
	Gender   string `json:"gender" validate:"required"`
	Address  string `json:"address" validate:"required"`
	UserID   int    `json:"user_id" validate:"required"`
}