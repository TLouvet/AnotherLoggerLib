document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll("nav a");
  const views = document.querySelectorAll(".view");

  // Fonction pour afficher une vue
  const showView = (viewId) => {
    views.forEach((view) => {
      view.classList.toggle("active", view.id === viewId);
    });
  };

  // Par défaut, afficher la vue "introduction"
  showView("introduction");

  // Ajouter des événements de clic aux liens de navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Empêcher le comportement par défaut des liens
      const viewId = link.getAttribute("data-view");
      showView(viewId);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("config-form");
  const generatedConfig = document.getElementById("generated-config");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const lang = document.getElementById("lang-select").value;
    const showPrefix = document.getElementById("show-prefix").checked;
    const timestampsActive = document.getElementById("timestamps-active").checked;

    // Appliquer la configuration au logger
    const config = {
      timestamp: {
        lang: lang,
        active: timestampsActive,
      },
      showLevelPrefix: showPrefix,
    };

    // Générer quelques logs pour tester
    Logger.info("Info log with your configuration!");
    Logger.success("Success log with your configuration!");
    Logger.warn("Warning log with your configuration!");
    Logger.error("Error log with your configuration!");
    Logger.critical("Critical log with your configuration!");

    // Mettre à jour le bloc de configuration généré
    generatedConfig.textContent = `Logger.config(${JSON.stringify(config, null, 2)});`;

    // Forcer un redimensionnement si nécessaire
    generatedConfig.style.height = "auto"; // Réinitialise la hauteur
  });
});


document.getElementById("copy-config").addEventListener("click", () => {
  const configText = document.getElementById("generated-config").textContent;

  navigator.clipboard.writeText(configText).then(() => {
    alert("Configuration copied to clipboard!");
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toggle");
  const frLink = document.getElementById("fr-link");
  const enLink = document.getElementById("en-link");
  const toggleCircle = document.getElementById("toggle-circle");

  // Set the default language based on the current URL
  if (window.location.pathname.includes("/fr")) {
    toggle.classList.remove("active");
    toggleCircle.style.transform = "translateX(0)";
  } else {
    toggle.classList.add("active");
    toggleCircle.style.transform = "translateX(25px)";
  }

  // Update the toggle state when clicked
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("active")) {
      window.location.href = "./demo/fr.html";
    } else {
      window.location.href = "/";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {

  // Function to test logs with the current configuration
  const testLogs = () => {
    Logger.info("Testing info log");
    Logger.success("Testing success log");
    Logger.warn("Testing warn log");
    Logger.error("Testing error log");
    Logger.critical("Testing critical log");
  };

  const form = document.getElementById("advanced-config-form");
  const generatedConfig = document.getElementById("advanced-generated-config");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Global settings
    const showPrefix = document.getElementById("show-prefix").checked;
    const enableTimestamps = document.getElementById("enable-timestamps").checked;
    const enableLogger = document.getElementById("enable-logger").checked;
    const timestampLang = document.getElementById("timestamp-lang").value;

    // Log levels
    const levels = {};
    document.querySelectorAll(".log-level").forEach((levelBlock) => {
      const level = levelBlock.dataset.level;
      const active = levelBlock.querySelector(".level-active").checked;
      const prefix = levelBlock.querySelector(".level-prefix").value;
      const color = levelBlock.querySelector(".level-color").value;
      const bg = levelBlock.querySelector(".level-bg").value;

      // Build the level configuration, omitting undefined or empty strings
      const levelConfig = { active };
      if (prefix) levelConfig.prefix = prefix;
      if (color) levelConfig.color = color;
      if (bg) levelConfig.bg = bg;

      levels[level] = levelConfig;
    });

    // Construct the configuration object
    const config = {
      showLevelPrefix: showPrefix,
      active: enableLogger,
      timestamp: {
        active: enableTimestamps,
        lang: timestampLang,
      },
      levels,
    };

    // Apply configuration to Logger
    Logger.config(config);

    // Display the generated configuration
    generatedConfig.textContent = `Logger.config(${JSON.stringify(config, null, 2)});`;

    // Generate logs to test the configuration
    testLogs();
  });


});
