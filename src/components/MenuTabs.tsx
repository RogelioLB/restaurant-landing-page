import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Registramos el plugin para poder usarlo
gsap.registerPlugin(useGSAP);

// Datos de menú
const menuCategories = [
  {
    id: "sushi",
    name: "Sushi",
    image: "/images/sushi-placeholder.svg",
    items: [
      {
        name: "Roll California Especial",
        price: "$175",
        description:
          "Delicioso roll con surimi, pepino, aguacate, cubierto de ajonjolí y tobiko. 8 piezas.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Roll Dragón",
        price: "$225",
        description:
          "Roll de camarón tempura con aguacate, cubierto de anguila y aguacate, bañado en salsa dulce. 8 piezas.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Nigiri Mixto",
        price: "$190",
        description:
          "Selección del chef con 6 piezas de nigiri variado: salmón, atún, camarón, pulpo, anguila y pez blanco.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Roll Culiacán",
        price: "$210",
        description:
          "Especialidad de la casa con camarón, aguacate y queso crema, empanizado y bañado en salsa chipotle. 10 piezas.",
        image: "/images/platillo-placeholder.svg",
      },
    ],
  },
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    image: "/images/hamburguesa-placeholder.svg",
    items: [
      {
        name: "Hamburguesa YOOKI Clásica",
        price: "$165",
        description:
          "200g de carne Angus, lechuga, tomate, cebolla caramelizada y queso cheddar en pan brioche.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Hamburguesa BBQ Bacon",
        price: "$195",
        description:
          "200g de carne Angus, tocino crujiente, queso gouda, aros de cebolla y salsa BBQ casera.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Hamburguesa Mexicana",
        price: "$185",
        description:
          "200g de carne Angus, guacamole, jalapeños, pico de gallo, queso oaxaca y salsa chipotle.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Hamburguesa Vegetariana",
        price: "$155",
        description:
          "Hamburguesa de frijol negro y champiñones portobello, aguacate, alioli, rúcula y tomate deshidratado.",
        image: "/images/platillo-placeholder.svg",
      },
    ],
  },
  {
    id: "boneless",
    name: "Boneless",
    image: "/images/boneless-placeholder.svg",
    items: [
      {
        name: "Boneless Clásicos (500g)",
        price: "$170",
        description:
          "Boneless de pollo crujientes bañados en tu salsa favorita: BBQ, Buffalo, Mango Habanero o Chipotle.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Boneless Explosivos (500g)",
        price: "$190",
        description:
          "Boneless de pollo bañados en nuestra salsa secreta de chile habanero, limón y miel. ¡Solo para valientes!",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Boneless Asiáticos (500g)",
        price: "$185",
        description:
          "Boneless de pollo bañados en salsa teriyaki con un toque de naranja y ajonjolí, acompañados de vegetales salteados.",
        image: "/images/platillo-placeholder.svg",
      },
      {
        name: "Boneless Mixtos (800g)",
        price: "$255",
        description:
          "Combinación de nuestros boneless en tres salsas diferentes para compartir. Incluye papas a la francesa.",
        image: "/images/platillo-placeholder.svg",
      },
    ],
  },
];

const MenuItem = ({ item }) => {
  const itemRef = useRef(null);

  useGSAP(
    () => {
      const element = itemRef.current;

      if (!element) return;

      const handleMouseEnter = () => {
        gsap.to(element, {
          y: -5,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          y: 0,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          duration: 0.3,
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      // El cleanup se realiza automáticamente gracias a useGSAP
      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: itemRef }
  );

  return (
    <div
      ref={itemRef}
      className="menu-item bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-5">
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
            <span className="font-bold text-red-600">{item.price}</span>
          </div>
          <p className="text-gray-600 mt-2">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function MenuTabs() {
  // Título y descripción del menú
  const menuTitle = (
    <div className="text-center mb-10">
      <div className="text-4xl font-bold mb-2">YOOKI <span className="text-red-600">MENU</span></div>
      <div className="text-lg text-gray-600">La auténtica experiencia del sushi japonés con un toque moderno</div>
    </div>
  );
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const contentRef = useRef(null);

  // Usamos useGSAP para manejar las animaciones y se ejecutará cuando cambie activeTab
  useGSAP(
    () => {
      // Solo ejecutamos animación si el contenedor existe
      if (!contentRef.current) return;
      
      // Obtenemos todos los elementos del menú activo
      const menuItems = contentRef.current.querySelectorAll(".menu-item");
      
      // Primero reseteamos cualquier animación previa
      gsap.set(menuItems, { clearProps: "all" });
      
      // Luego aplicamos la nueva animación
      gsap.fromTo(
        menuItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // Aseguramos que los elementos queden visibles al final
            gsap.set(menuItems, { opacity: 1, y: 0 });
          }
        }
      );
    },
    { scope: contentRef, dependencies: [activeTab] } // La clave está aquí: activeTab como dependencia
  );

  // Función para cambiar de tab
  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return; // Evita rerenderizar si ya estamos en ese tab
    setActiveTab(tabId);
  };

  // Encontrar la categoría activa
  const activeCategory =
    menuCategories.find((category) => category.id === activeTab) ||
    menuCategories[0];

  return (
    <div>
      {menuTitle}
      {/* Tabs de navegación */}
      <div className="menu-tabs mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabClick(category.id)}
              className={`menu-tab-button px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                category.id === activeTab
                  ? "active bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-6 h-6 object-contain"
                />
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del tab activo */}
      <div ref={contentRef} className="menu-tab-content">
        <div className="grid md:grid-cols-2 gap-8" key={activeTab}> {/* La clave key fuerza un re-render al cambiar de tab */}
          {activeCategory.items.map((item, index) => (
            <MenuItem key={`${activeCategory.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
