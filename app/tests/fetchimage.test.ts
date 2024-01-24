// write a test for the [fetch] api call
// gt
describe("This should return a public URL for an image", () => {
  it("should return a public URL for an image", async () => {
    const itemID = 'c1c980a9-8ecc-479d-94cd-6adf58879f21'
    const res = await fetch(`http://localhost:3000/api/${itemID}`)
    // retrieve publicUrl from data object
    const { data: { publicUrl } } = await res.json()
    console.log(publicUrl)
    })
})
