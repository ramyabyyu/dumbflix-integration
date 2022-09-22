package slug

import (
	"math/rand"
	"time"

	"github.com/gosimple/slug"
)
  
  const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  
  var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))
  
  func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
	  b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
  }
  
  func String(length int) string {
	return StringWithCharset(length, charset)
  }

  func GenerateSlug(text string) string {
	randUniqueTime := time.Now().Minute() + time.Now().Hour()
	result := slug.Make(text + "-" + String(randUniqueTime))
	return result
  }

//   func main() {
// 	name := "Ramy Abyyu"
// 	randTime := time.Now().Add(time.Hour * 69).String()
// 	slugTest := slug.Make(name + "-" + StringWithCharset(20, charset) + "-" + randTime)
// 	fmt.Println(slugTest)
//   }