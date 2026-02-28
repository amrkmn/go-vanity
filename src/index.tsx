import { Context, Hono } from "hono";

type Bindings = {
    DOMAIN: string;
};

const app = new Hono<{ Bindings: Bindings }>();
const repos: Record<string, string> = {
    scg: "https://github.com/amrkmn/scg",
};

function goGet(c: Context<{ Bindings: Bindings }>, name: string, url: string) {
    const goGet = c.req.query("go-get");
    const domain = c.env.DOMAIN;

    if (goGet) {
        return c.html(
            <html>
                <head>
                    <meta name="go-import" content={`${domain}/${name} git ${url}`} />
                </head>
            </html>,
        );
    }
    return c.redirect(url, 301);
}

app.use("*", async (c, next) => {
    if (!c.env.DOMAIN || c.env.DOMAIN.trim() === "") {
        throw new Error("DOMAIN binding is required but not set");
    }
    await next();
});

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get("/:name", (c) => {
    const name = c.req.param("name");
    const url = repos[name];
    if (!url) return c.notFound();

    return goGet(c, name, url);
});

export default app;
