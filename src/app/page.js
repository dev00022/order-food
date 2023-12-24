import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeader subHeader={"Out story"} mainHeader={"About us"} />
        <div className="text-gray-600 max-w-2xl mx-auto mt-4">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            dignissimos voluptatem hic non unde dolore velit labore officiis
            nisi eveniet.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            harum, modi qui similique saepe repellendus illum dolore rerum
            officiis inventore blanditiis doloremque cum cupiditate magnam
            obcaecati commodi. Mollitia, incidunt harum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem sapiente eveniet obcaecati! Voluptate, necessitatibus! Possimus dicta dignissimos molestiae perferendis minus delectus a quod voluptatum reprehenderit quibusdam, facere quia odit nemo eligendi tempora dolorum. Enim neque commodi exercitationem totam tempore adipisci, iure voluptates? Quas quaerat officia, quibusdam vero saepe totam similique atque cumque quia beatae labore in quis neque temporibus aspernatur iure accusamus. Perferendis, ad iusto nulla voluptatum laudantium iure quaerat nihil provident quas optio, soluta incidunt. Dolore sapiente quaerat repellendus culpa porro quidem, provident voluptas ipsum eum animi veniam perspiciatis quas explicabo ut architecto assumenda ex suscipit beatae harum sequi. Maxime veniam, doloribus perspiciatis culpa deleniti magni ea qui eaque, reiciendis explicabo minima neque omnis laborum tempora at? Ab quisquam cupiditate accusamus aperiam est a totam voluptatibus, ut quod impedit, unde eos incidunt natus vero ratione fugit praesentium distinctio necessitatibus minus nam molestiae? Maxime dolorum facere ipsa, dolorem voluptatibus voluptate dolor quaerat veritatis rem doloremque, repellendus numquam? Voluptatibus, optio! At porro quis voluptates architecto, quidem in, assumenda rerum omnis odio optio eius quia sequi id ad unde dicta necessitatibus laboriosam qui doloribus? Odit iste quisquam laboriosam dignissimos autem animi vitae, explicabo maiores nulla a consequatur possimus aut recusandae minima!
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact Us"} />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-600"
            href="tel:+91531267071"
          >
            +91 531 276 071
          </a>
        </div>
      </section>
    </>
  );
}
