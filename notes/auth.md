- Auth Middleware sample:
  ---> src/app/middleware.ts

```ts
import { NextResponse } from 'next/server;
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = Boolean(request.cookies.get('authToken'));
    if (!isAuthenticated) {
        return NextResponse.redirect('/login');
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['dashboard', 'profile']
}
```

---

- Using Kinde:
  ---> src/middleware.ts

```ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  return withAuth(request);
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
```

- Validating that user is authenticated in Server Actions:
  ---> src/app/actions.ts

```ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const { isAuthenticated, getPermission } = await getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    return redirect("/api/auth/login");
  }
  const requiredPermission = await getPermission("create:product");

  if (requiredPermission.isGranted) {
    // ... await createProduct()
    revalidatePath("/dashboard");
  } else {
    redirect("/dashboard");
  }
}
```

---

- Next.js Auth Flow (self-hosted):
  ---> src/app/page.tsx

  ```tsx
  import { useAuth } from "@kinde-oss/kinde-auth-nextjs/client";
  import { redirect } from "next/navigation";
  import { getSession, login, logout } from "@/lib";

  export default async function Page() {
    const session = await getSession();
    return (
      <section>
        <form
          action={async (formData) => {
            "use server";
            await login(formData);
            redirect("/");
          }}
        >
          <input type="email" placeholder="Email" />
          <br />
          <button type="submit">Login</button>
        </form>
        <form
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </section>
    );
  }
  ```

  ```ts
  import { SignJWT, jwtVerify } from "jose";
  import { cookies } from "next/headers";
  import { NextRequest, NextResponse } from "next/server";

  const secretKey = "secret";
  const key = new TextEncoder().encode(secretKey);

  export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 hour from now")
      .sign(key);
  }

  export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

  export async function login(formData: FormData) {
    const user = { email: formData.get("email"), name: "John" };

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }

  export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
  }

  export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return decrypt(session);
  }

  export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 3600 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
  ```

  ---> src/middleware.ts

  ```ts
  import { NextRequest } from "next/server";
  import { updateSession } from "./lib";

  export async function middleware(request: NextRequest) {
    return updateSession(request);
  }
  ```
