import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type WPPost = {
  id: number;
  link: string;
  date: string;
  title: { rendered: string };
};

const API_URL =
  'https://blog.east-meridian.com/wp-json/wp/v2/posts?per_page=5&_embed';

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const decodeHtml = (html: string) => {
  const el = document.createElement('textarea');
  el.innerHTML = html;
  return el.value;
};

const BlogNewsSection = () => {
  const [posts, setPosts] = useState<WPPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(API_URL, { headers: { Accept: 'application/json' } });
        if (!res.ok) {
          console.error(`[BlogNewsSection] HTTP ${res.status} ${res.statusText} при запросе ${API_URL}`);
          return;
        }
        const data: WPPost[] = await res.json();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        if (err instanceof TypeError) {
          console.error(
            '[BlogNewsSection] Не удалось получить посты (вероятно, CORS или сеть):',
            err.message,
            err,
          );
        } else {
          console.error('[BlogNewsSection] Ошибка при загрузке постов:', err);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog-news" className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-baseline justify-between gap-4 mb-6"
        >
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Блог
            </span>
            <h2 className="text-xl md:text-2xl font-black text-foreground mt-1">
              Последние новости
            </h2>
          </div>
          <a
            href="https://blog.east-meridian.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {posts.map((post, i) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <time
                  dateTime={post.date}
                  className="block text-xs text-muted-foreground mb-2"
                >
                  {formatDate(post.date)}
                </time>
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                  {decodeHtml(post.title.rendered)}
                </h3>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogNewsSection;
