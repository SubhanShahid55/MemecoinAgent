import Image from "next/image"

const JoinedStudents = () => {
  // In a real implementation, these would be actual student images
  const studentAvatars = [
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
    "/placeholder.svg?height=60&width=60",
  ]

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Join <span className="text-primary">2,500+</span> Students Already Profiting
          </h2>

          <div className="flex justify-center mb-6">
            <div className="flex -space-x-4">
              {studentAvatars.map((avatar, index) => (
                <div key={index} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden">
                  <Image
                    src={avatar || "/placeholder.svg"}
                    alt={`Student ${index + 1}`}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-black">
                +2.5k
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-4">Students who joined are now paying only €70.99 instead of €99.99</p>

          <div className="flex justify-center">
            <div className="inline-flex items-center bg-green-900/30 text-green-400 px-4 py-2 rounded-lg">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>500+ students online now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinedStudents

