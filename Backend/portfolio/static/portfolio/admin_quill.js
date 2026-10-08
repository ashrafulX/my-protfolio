(function () {
  function initQuillForAdmin() {
    const textarea = document.getElementById("id_content");
    if (!textarea || textarea.dataset.quillInitialized) {
      return;
    }

    if (typeof window.Quill === "undefined") {
      console.warn("Quill library not loaded yet; waiting...");
      setTimeout(initQuillForAdmin, 250);
      return;
    }

    textarea.dataset.quillInitialized = "true";

    // Register style attributors so Quill uses inline CSS styles (16px, font-family, align)
    try {
      const Size = window.Quill.import("attributors/style/size");
      if (Size) {
        Size.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
        window.Quill.register(Size, true);
      }

      const Font = window.Quill.import("attributors/style/font");
      if (Font) {
        Font.whitelist = ["sans-serif", "serif", "monospace"];
        window.Quill.register(Font, true);
      }

      const Align = window.Quill.import("attributors/style/align");
      if (Align) {
        window.Quill.register(Align, true);
      }
    } catch (err) {
      console.warn("Error registering Quill attributors:", err);
    }

    // Build the UI containers
    const wrapper = document.createElement("div");
    wrapper.className = "quill-admin-wrapper";

    const topbar = document.createElement("div");
    topbar.className = "quill-admin-topbar";

    const badge = document.createElement("div");
    badge.className = "quill-admin-badge";
    badge.innerHTML = "<span>📝</span><span>MS Word-Style Article Editor (Format, Size, Colors & Images)</span>";

    const actions = document.createElement("div");
    actions.className = "quill-admin-actions";

    const imgUrlBtn = document.createElement("button");
    imgUrlBtn.type = "button";
    imgUrlBtn.className = "quill-admin-btn";
    imgUrlBtn.textContent = "🖼️ Insert Image URL";
    imgUrlBtn.title = "Insert an image directly from a web link";

    const toggleModeBtn = document.createElement("button");
    toggleModeBtn.type = "button";
    toggleModeBtn.className = "quill-admin-btn";
    toggleModeBtn.textContent = "💻 Raw HTML / Code";
    toggleModeBtn.title = "Switch between Visual Word mode and Raw HTML code";

    actions.appendChild(imgUrlBtn);
    actions.appendChild(toggleModeBtn);
    topbar.appendChild(badge);
    topbar.appendChild(actions);

    const editorDiv = document.createElement("div");
    editorDiv.id = "quill-content-editor";

    // Insert wrapper in DOM before the textarea
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(topbar);
    wrapper.appendChild(editorDiv);

    // Style the original textarea for raw editing
    textarea.classList.add("quill-raw-textarea");
    textarea.style.display = "none";
    wrapper.appendChild(textarea);

    // Quill toolbar settings with Font, Header, Size, Formatting, Align, Lists, Images
    const toolbarOptions = [
      [{ font: ["sans-serif", "serif", "monospace"] }],
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ];

    const quill = new window.Quill(editorDiv, {
      theme: "snow",
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: function () {
              const choice = window.prompt(
                "Insert Image:\n- Paste an Image URL (e.g. Cloudinary, Unsplash, Imgur)\n- OR leave blank and click OK to upload from your computer:"
              );
              if (choice && choice.trim().length > 0) {
                const range = quill.getSelection(true);
                quill.insertEmbed(range ? range.index : 0, "image", choice.trim());
                if (range) quill.setSelection(range.index + 1);
              } else if (choice === "") {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.onchange = function () {
                  if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      const range = quill.getSelection(true);
                      quill.insertEmbed(range ? range.index : 0, "image", e.target.result);
                      if (range) quill.setSelection(range.index + 1);
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                  }
                };
                fileInput.click();
              }
            },
          },
        },
      },
      placeholder: "Write your article here... Use the toolbar above to set Headings, Font Size, Text Colors, Highlights, and insert Images.",
    });

    // Populate initial content
    if (textarea.value && textarea.value.trim().length > 0) {
      if (quill.clipboard && typeof quill.clipboard.dangerouslyPasteHTML === "function") {
        quill.clipboard.dangerouslyPasteHTML(textarea.value);
      } else {
        quill.root.innerHTML = textarea.value;
      }
    }

    // Sync on text change
    quill.on("text-change", function () {
      textarea.value = quill.root.innerHTML === "<p><br></p>" ? "" : quill.root.innerHTML;
    });

    // Add friendly titles/tooltips to toolbar buttons
    setTimeout(function () {
      const tooltips = {
        ".ql-bold": "Bold (Ctrl+B)",
        ".ql-italic": "Italic (Ctrl+I)",
        ".ql-underline": "Underline (Ctrl+U)",
        ".ql-strike": "Strikethrough",
        ".ql-color": "Text Color",
        ".ql-background": "Highlight / Background Color",
        ".ql-align": "Text Alignment",
        ".ql-list[value='ordered']": "Numbered List",
        ".ql-list[value='bullet']": "Bullet List",
        ".ql-indent[value='-1']": "Decrease Indent",
        ".ql-indent[value='+1']": "Increase Indent",
        ".ql-blockquote": "Quote Block",
        ".ql-code-block": "Code Block",
        ".ql-link": "Insert / Edit Link",
        ".ql-image": "Insert Image (Upload or URL)",
        ".ql-video": "Embed Video URL",
        ".ql-clean": "Clear Formatting",
        ".ql-header": "Text Heading (H1, H2, H3, H4, Normal)",
        ".ql-size": "Font Size (12px, 14px, 16px, 18px, 20px, 24px, 32px)",
        ".ql-font": "Font Family (Sans-serif, Serif, Monospace)",
      };

      for (const [selector, text] of Object.entries(tooltips)) {
        const el = wrapper.querySelector(selector);
        if (el) el.setAttribute("title", text);
      }
    }, 200);

    // Insert Image URL quick button in topbar
    imgUrlBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const url = window.prompt("Enter image URL to insert into article:");
      if (url && url.trim().length > 0) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range ? range.index : 0, "image", url.trim());
        if (range) quill.setSelection(range.index + 1);
      }
    });

    // Toggle between Visual and Raw HTML mode
    let isRawMode = false;
    toggleModeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const qlToolbar = wrapper.querySelector(".ql-toolbar");
      const qlContainer = wrapper.querySelector(".ql-container");

      if (!isRawMode) {
        // Switch to Raw
        textarea.value = quill.root.innerHTML === "<p><br></p>" ? "" : quill.root.innerHTML;
        if (qlToolbar) qlToolbar.style.display = "none";
        if (qlContainer) qlContainer.style.display = "none";
        textarea.style.display = "block";
        toggleModeBtn.textContent = "📝 Visual (Word) Mode";
        imgUrlBtn.style.display = "none";
        isRawMode = true;
      } else {
        // Switch to Visual
        if (quill.clipboard && typeof quill.clipboard.dangerouslyPasteHTML === "function") {
          quill.clipboard.dangerouslyPasteHTML(textarea.value || "");
        } else {
          quill.root.innerHTML = textarea.value || "";
        }
        textarea.style.display = "none";
        if (qlToolbar) qlToolbar.style.display = "";
        if (qlContainer) qlContainer.style.display = "";
        toggleModeBtn.textContent = "💻 Raw HTML / Code";
        imgUrlBtn.style.display = "";
        isRawMode = false;
      }
    });

    // Ensure synced on form submit
    const form = textarea.closest("form");
    if (form) {
      form.addEventListener("submit", function () {
        if (!isRawMode) {
          textarea.value = quill.root.innerHTML === "<p><br></p>" ? "" : quill.root.innerHTML;
        }
      });
    }
  }

  // Load dynamically if Quill CDN script tag is missing
  function ensureQuillLoaded() {
    if (typeof window.Quill !== "undefined") {
      initQuillForAdmin();
      return;
    }

    if (!document.getElementById("quill-snow-css")) {
      const link = document.createElement("link");
      link.id = "quill-snow-css";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("quill-cdn-script")) {
      const script = document.createElement("script");
      script.id = "quill-cdn-script";
      script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
      script.onload = function () {
        initQuillForAdmin();
      };
      document.head.appendChild(script);
    } else {
      setTimeout(initQuillForAdmin, 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureQuillLoaded);
  } else {
    ensureQuillLoaded();
  }
})();
