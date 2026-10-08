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

    // Build the UI containers
    const wrapper = document.createElement("div");
    wrapper.className = "quill-admin-wrapper";

    const topbar = document.createElement("div");
    topbar.className = "quill-admin-topbar";

    const badge = document.createElement("div");
    badge.className = "quill-admin-badge";
    badge.innerHTML = "<span>📝</span><span>Rich Text Editor (MS Word Style)</span>";

    const actions = document.createElement("div");
    actions.className = "quill-admin-actions";

    const imgUrlBtn = document.createElement("button");
    imgUrlBtn.type = "button";
    imgUrlBtn.className = "quill-admin-btn";
    imgUrlBtn.textContent = "🖼️ Insert Image URL";

    const toggleModeBtn = document.createElement("button");
    toggleModeBtn.type = "button";
    toggleModeBtn.className = "quill-admin-btn";
    toggleModeBtn.textContent = "💻 Raw HTML / Code";

    actions.appendChild(imgUrlBtn);
    actions.appendChild(toggleModeBtn);
    topbar.appendChild(badge);
    topbar.appendChild(actions);

    const editorDiv = document.createElement("div");
    editorDiv.id = "quill-content-editor";

    // Insert wrapper in DOM
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(topbar);
    wrapper.appendChild(editorDiv);

    // Style the original textarea for raw editing
    textarea.classList.add("quill-raw-textarea");
    textarea.style.display = "none";
    wrapper.appendChild(textarea);

    // Quill toolbar settings
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
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
                "Paste Image URL (or leave blank to select an image from your computer):"
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
      placeholder: "Write your blog post here... (support headings, bold, text color, highlight, normal images, lists, etc.)",
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

    // Insert Image URL quick button
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

    // Ensure synced on submit
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
