import Image from "next/image";
import { Row, Col, Container, Button, Form, Nav, Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavLink } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-emerald-600">
        <Container>
          <NavbarBrand href="#5">
            <Image
              src="/logo_temp.svg"
              alt="Temporary Logo"
              width={75}
              height={75}
            />
          </NavbarBrand>
          <NavbarToggle aria-controls="responsive-navbar-nav"/>
          <NavbarCollapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="font-bold navbar-text-custom" href="#1">Revamp</NavLink>
              <NavLink className="font-bold navbar-text-custom" href="#2">Information</NavLink>
              <NavLink className="font-bold navbar-text-custom" href="#3">About Us</NavLink>
            </Nav>

            <Nav>
              <NavLink href="#4"><Button variant="secondary">Signup</Button></NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="h-100">
          <Col />
          <Col>
          </Col>
          <Col />
        </Row>
      </Container>
      {/* <div className="bg-emerald-600 flex justify-around">
        <div className="flex justify-evenly items-center w-1/3 h-20">
            <Image
              src="/logo_temp.svg"
              alt="Temporary Logo"
              width={75}
              height={75}
            />
          <a className='font-bold hover:text-gray-700' href="#">Revamp</a>
          <a className='font-bold hover:text-gray-700' href="#">Information</a>
          <a className='font-bold hover:text-gray-700' href="#">About Us</a>
        </div>

        <div className="flex items-center justify-end w-1/3 h-20">
          <a className='font-bold hover:text-gray-700 float-right' href="#">Signup</a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="flex flex-col col-span-1 h-screen">
          <div className="flex flex-col justify-end text-center items-center h-1/3 w-full">
            <h1 className="font-bold text-[3.5em]">revamp.ai</h1>
            <p className="m-4">Modernize your front-end simply with the click of a button. Our AI will handle the freshen the website up to a modern standard.</p>
            <button className='bg-emerald-600 w-1/2 p-4 mt-5 rounded-md'> Revamp Me!</button>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div> */}
    </>
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    //   <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={100}
    //       height={20}
    //       priority
    //     />
    //     <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
    //       <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
    //         To get started, edit the page.tsx file.
    //       </h1>
    //       <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
    //         Looking for a starting point or more instructions? Head over to{" "}
    //         <a
    //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //           className="font-medium text-zinc-950 dark:text-zinc-50"
    //         >
    //           Templates
    //         </a>{" "}
    //         or the{" "}
    //         <a
    //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //           className="font-medium text-zinc-950 dark:text-zinc-50"
    //         >
    //           Learning
    //         </a>{" "}
    //         center.
    //       </p>
    //     </div>
    //     <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
    //       <a
    //         className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={16}
    //           height={16}
    //         />
    //         Deploy Now
    //       </a>
    //       <a
    //         className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Documentation
    //       </a>
    //     </div>
    //   </main>
    // </div>
  );
}
