import type { MetadataRoute } from "next";
const routes=["","/sobre","/servicos","/educacao","/educacao/doencas-agravos","/downloads","/blog","/blog/silicose","/blog/notificacao","/blog/visat","/contato","/politica-de-privacidade","/termos-de-uso","/obrigado"];
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return routes.map((route)=>({url:`https://ceresttiangua.eu.org${route}`,lastModified:now,changeFrequency:route.startsWith("/blog")?"monthly":"yearly",priority:route===""?1:route==="/contato"?0.9:0.7}))}
