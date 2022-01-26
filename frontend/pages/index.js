import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import MainIMG from "../public/frontimg.jpeg";
import classes from "../styles/Home.module.css";
export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 overflow-x-hidden h-screen">
      <Head>
        <title>Signed --Homepage</title>
        <meta
          name="description"
          content="A social plateform that helps you grow your career and network with like-minded individuals"
        />
      </Head>
      <div className="flex flex-col content-between  bg-slate-50   ">
        <div className={classes.headerMain}>
          <Header />
          <div className="flex items-center justify-evenly">
            <div
              className="md:ml-20 flex flex-col"
              // style={{ alignItems: "center" }}
            >
              <p className={classes.mainText}>
                Grow Your
                <br /> Brand
              </p>
              <p
                className="mt-2 text-gray-500 "
                style={{ width: "250px", fontSize: "20px" }}
              >
                Grow you&apos;re career, showcase your skills and experience,
                and connect with like-minded people
              </p>
              <button
                className="border-2 border-sky-400 p-4  text-black mt-6 w-full md:w-72 font-bold text-xl"
                onClick={() => router.push("/users/sign-up")}
              >
                Sign Up <span className="text-sm">--it&apos;s free</span>
              </button>
            </div>
            <div className="hidden sm:block ">
              <Image
                src={MainIMG}
                width={700}
                height={700}
                objectFit="contain"
                alt=""
              />
            </div>
          </div>
        </div>
        <footer
          className={classes.footer}
          style={{
            bottom: "0",
            fontSize: "12px",
            overflowX: "hidden",

            overflowWrap: "break-word",
          }}
        >
          <p>About</p>
          <p>Help Center</p>
          <p>Terms of Service</p>
          <p>Private Policy</p>
          <p>Cookie Policy</p>
          <p>Accessibility</p>
          <p>Ads info</p>
          <p>Blog</p>
          <p>Status</p>
          <p>Careers</p>
          <p>Brand Resources</p>
          <p>Advertising</p>
          <p>Marketing</p>
          <p>Signed for Business</p>
          <p>Developers</p>
          <p>Directory</p>
          <p>Settings</p>
          <p>&copy; Signed, inc.</p>
        </footer>
      </div>
    </div>
  );
}
