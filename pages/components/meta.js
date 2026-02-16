export async function generateMetadata({ params, searchParams }, parent) {
    const slug = (await params).slug
   
    // fetch post information
    const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
      res.json()
    )
   
    return {
      title: post.title,
      description: post.description,
    }
  }
   
  export default function Page({ params, searchParams }) {}