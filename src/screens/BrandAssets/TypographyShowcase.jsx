import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function TypographyShowcase() {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    let mounted = true;
    async function loadFonts() {
      try {
        const q = query(
          collection(db, "assets"),
          where("category", "==", "typography"),
          orderBy("uploadedAt", "desc")
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setFonts(list);
      } catch (err) {
        console.error("Error loading typography:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFonts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-heading-xl mb-2">Typography</h1>
        <p className="text-body-md text-muted-foreground mb-8">Brand typography and font guidelines</p>
        <div className="card">
          <div className="text-center py-12 text-body-md text-muted-foreground">Loading typography…</div>
        </div>
      </div>
    );
  }

  if (!fonts.length) {
    return (
      <div>
        <h1 className="text-heading-xl mb-2">Typography</h1>
        <p className="text-body-md text-muted-foreground mb-8">Brand typography and font guidelines</p>
        <div className="card">
          <div className="text-center py-12 text-body-md text-muted-foreground border-2 border-dashed border-border rounded-lg">
            No typography assets found. Upload typography assets to see them here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <div className="overflow-hidden rounded-xl bg-primary p-8 text-primary-foreground">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-heading-xl">Typography</h2>
              <p className="max-w-[600px] text-body-md text-white/80">
                Brand typography and font guidelines for consistent communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography List */}
      <section>
        <div className="space-y-6">
        {fonts.map((font) => {
          const meta = font.metadata || {};
          const fontFamily = meta.fontFamily || meta.family || "Arial";
          const fontWeight = meta.fontWeight || meta.weight || "400";
          const fontStyle = meta.fontStyle || "normal";
          
          return (
            <div key={font.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-heading-md mb-2">{font.name || "Unnamed Font"}</h2>
                  <div className="flex flex-wrap gap-2 text-label-md text-muted-foreground">
                    {fontFamily && <span>Family: <span className="text-foreground">{fontFamily}</span></span>}
                    {fontWeight && <span>Weight: <span className="text-foreground">{fontWeight}</span></span>}
                    {fontStyle && fontStyle !== "normal" && (
                      <span>Style: <span className="text-foreground">{fontStyle}</span></span>
                    )}
                  </div>
                </div>
                {font.fileUrl && (
                  <a
                    href={font.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-sm"
                  >
                    Download
                  </a>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-label-md text-muted-foreground mb-2">Heading Sample</h3>
                  <p
                    className="text-3xl"
                    style={{
                      fontFamily: fontFamily,
                      fontWeight: fontWeight,
                      fontStyle: fontStyle,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <div>
                  <h3 className="text-label-md text-muted-foreground mb-2">Body Sample</h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: fontFamily,
                      fontWeight: fontWeight,
                      fontStyle: fontStyle,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
                {meta.usage && (
                  <div className="mt-4 p-3 bg-info-light rounded-lg border border-border">
                    <h4 className="text-label-md text-info-foreground mb-1">Usage Notes</h4>
                    <p className="text-body-sm text-muted-foreground">{meta.usage}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </section>
    </div>
  );
}





