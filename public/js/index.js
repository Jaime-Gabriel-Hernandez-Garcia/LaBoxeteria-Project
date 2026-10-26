/* ==========================================================
   LA BOXETERIA — PACKAGING WORKBENCH & WORKSHOP DISPATCH
   Vanilla JavaScript Logic
   ========================================================== */

const PACK_CATALOG = {
    envio: {
        name: 'Caja Corrugada Autoarmable',
        badge: 'Línea E-Commerce Autoarmable',
        feat: 'Flauta C • Doble pared lateral',
        desc: 'La favorita para tiendas en línea. Se arma en segundos sin necesidad de cinta en los laterales. Resiste apilado rudo en paqueterías.',
        img: 'public/img/box_ecommerce.jpg',
        measures: [
            { label: 'Chica: 15 × 15 × 10 cm (Joyería / Accesorios)', price: 12.00 },
            { label: 'Mediana: 25 × 20 × 12 cm (Ropa / Calzado / Estándar)', price: 15.50 },
            { label: 'Grande: 35 × 25 × 18 cm (Múltiples prendas / Kits)', price: 21.00 },
            { label: 'Jumbo: 45 × 35 × 25 cm (Paquetes voluminosos)', price: 29.00 }
        ]
    },
    sorpresa: {
        name: 'Caja Sorpresa Mystery Box',
        badge: 'Edición Especial de Regalo',
        feat: 'Colores corporativos amarillo y azul noche',
        desc: 'El emblema de La Boxeteria. Diseñada con apertura envolvente y rigidez superior para kits de regalo, lanzamientos de marca y experiencias de unboxing.',
        img: 'public/img/box_mystery.jpg',
        measures: [
            { label: 'Chica: 20 × 20 × 15 cm (Regalos y accesorios)', price: 22.00 },
            { label: 'Mediana: 25 × 25 × 20 cm (Kits y lanzamientos)', price: 28.50 },
            { label: 'Grande: 32 × 32 × 25 cm (Experiencias premium)', price: 36.00 }
        ]
    },
    alimentos: {
        name: 'Cajas para Alimentos & Pizza',
        badge: 'Grado Alimenticio & Repostería',
        feat: 'Retención térmica y cartón kraft virgen',
        desc: 'Fabricadas con cartón resistente a grasas y vapor. Ideales para pizzas artesanales, pasteles, postres y comida para llevar en CDMX.',
        img: 'public/img/box_food.jpg',
        measures: [
            { label: 'Individual: 22 × 22 × 4 cm (Pizza chica / Postres)', price: 10.50 },
            { label: 'Mediana: 32 × 32 × 4.5 cm (Pizza estándar / Tartas)', price: 14.00 },
            { label: 'Familiar: 42 × 42 × 5 cm (Pizza jumbo / Catering)', price: 18.50 }
        ]
    },
    kraft: {
        name: 'Bolsas Kraft con Asa Torcida',
        badge: '100% Biodegradable & Compostable',
        feat: 'Papel kraft 120g con asa reforzada',
        desc: 'Bolsas de mostrador ecológicas para boutiques, panaderías y cafeterías. Fondo plano reforzado que sostiene peso sin desfondarse.',
        img: 'public/img/kraft_bags.jpg',
        measures: [
            { label: 'Chica: 18 × 24 × 8 cm (Accesorios / Panadería)', price: 7.50 },
            { label: 'Mediana: 26 × 35 × 12 cm (Prendas / Zapatería)', price: 9.80 },
            { label: 'Grande: 32 × 42 × 14 cm (Compras de mostrador)', price: 12.50 }
        ]
    }
};

function initPackagingWorkbench() {
    let currentKey = 'envio';

    const tabButtons = document.querySelectorAll('.cat-pill');
    const displayImg = document.getElementById('workbench-img');
    const namePill = document.getElementById('pack-name-pill');
    const featBadge = document.getElementById('pack-badge-feat');
    const displayTitle = document.getElementById('pack-display-title');
    const displayDesc = document.getElementById('pack-display-desc');
    const measureSelect = document.getElementById('select-measure');
    const customBox = document.getElementById('custom-measure-box');
    const customLength = document.getElementById('custom-length');
    const customWidth = document.getElementById('custom-width');
    const customHeight = document.getElementById('custom-height');
    const qtySelect = document.getElementById('select-quantity');
    const unitPriceEl = document.getElementById('display-unit-price');
    const totalPriceEl = document.getElementById('display-total-price');
    const submitBtn = document.getElementById('btn-request-pack');

    if (!measureSelect || !qtySelect || !unitPriceEl || !totalPriceEl) return;

    function populateMeasures(key) {
        const data = PACK_CATALOG[key];
        if (!data) return;

        measureSelect.innerHTML = '';
        data.measures.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = item.label;
            opt.setAttribute('data-price', String(item.price));
            opt.textContent = item.label;
            if (idx === 1 || (data.measures.length === 1 && idx === 0)) {
                opt.selected = true;
            }
            measureSelect.appendChild(opt);
        });

        // Add custom measure option
        const customOpt = document.createElement('option');
        customOpt.value = 'custom';
        customOpt.setAttribute('data-price', '0');
        customOpt.textContent = 'Personalizada: Dimensiones a tu medida (Largo × Ancho × Alto)';
        measureSelect.appendChild(customOpt);
    }

    function calculate() {
        const config = PACK_CATALOG[currentKey];
        const selectedMeasureOpt = measureSelect.options[measureSelect.selectedIndex];
        const selectedQtyOpt = qtySelect.options[qtySelect.selectedIndex];

        if (!selectedMeasureOpt || !selectedQtyOpt) return;

        const isCustom = selectedMeasureOpt.value === 'custom';

        if (customBox) {
            customBox.style.display = isCustom ? 'block' : 'none';
        }

        const qtyDiscount = parseFloat(selectedQtyOpt.getAttribute('data-disc') || '1.0');
        const qty = parseInt(qtySelect.value, 10) || 100;

        const radio = document.querySelector('input[name="pack-print"]:checked');
        const hasPrint = radio && radio.value.includes('logo');
        const printFee = hasPrint ? 2.5 : 0;

        if (isCustom) {
            unitPriceEl.textContent = 'A cotizar en taller';
            totalPriceEl.textContent = 'Según suaje y calibre';

            const l = customLength ? (customLength.value.trim() || '—') : '—';
            const w = customWidth ? (customWidth.value.trim() || '—') : '—';
            const h = customHeight ? (customHeight.value.trim() || '—') : '—';

            return {
                isCustom: true,
                productName: config.name,
                measure: `Medida especial (${l} × ${w} × ${h} cm)`,
                quantity: qty,
                printOption: radio ? radio.value : 'Kraft liso',
                unitFormatted: 'Por cotizar',
                totalFormatted: 'Por cotizar'
            };
        }

        const basePrice = parseFloat(selectedMeasureOpt.getAttribute('data-price') || '15.50');
        const finalUnit = (basePrice + printFee) * qtyDiscount;
        const finalTotal = finalUnit * qty;

        unitPriceEl.textContent = `$${finalUnit.toFixed(2)} MXN`;
        totalPriceEl.textContent = `$${finalTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

        return {
            isCustom: false,
            productName: config.name,
            measure: selectedMeasureOpt.value,
            quantity: qty,
            printOption: radio ? radio.value : 'Kraft liso',
            unitFormatted: finalUnit.toFixed(2),
            totalFormatted: finalTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    }

    // Switch Category Tabs
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const key = btn.getAttribute('data-pack') || 'envio';
            currentKey = key;
            const config = PACK_CATALOG[key];

            if (config) {
                if (displayImg) displayImg.src = config.img;
                if (namePill) namePill.textContent = config.badge;
                if (featBadge) featBadge.textContent = config.feat;
                if (displayTitle) displayTitle.textContent = config.name;
                if (displayDesc) displayDesc.textContent = config.desc;

                populateMeasures(key);
                calculate();
            }
        });
    });

    // Control Listeners
    measureSelect.addEventListener('change', calculate);
    qtySelect.addEventListener('change', calculate);
    document.querySelectorAll('input[name="pack-print"]').forEach((r) => {
        r.addEventListener('change', calculate);
    });

    if (customLength) customLength.addEventListener('input', calculate);
    if (customWidth) customWidth.addEventListener('input', calculate);
    if (customHeight) customHeight.addEventListener('input', calculate);

    // Initial load
    populateMeasures(currentKey);
    calculate();

    // Direct WhatsApp Button
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const res = calculate();
            if (!res) return;

            let message = '';
            if (res.isCustom) {
                message =
                    `Hola La Boxeteria! Quisiera solicitar cotización directa de taller para medida personalizada:\n\n` +
                    `• Línea: ${res.productName}\n` +
                    `• Dimensiones solicitadas: ${res.measure}\n` +
                    `• Tiraje estimado: ${res.quantity} piezas\n` +
                    `• Acabado: ${res.printOption}\n\n` +
                    `¿Me podrían apoyar con el costo de fabricación y tiempo de entrega en su taller de GAM?`;
            } else {
                message =
                    `Hola La Boxeteria! Quisiera solicitar cotización directa de taller:\n\n` +
                    `• Línea: ${res.productName}\n` +
                    `• Medida: ${res.measure}\n` +
                    `• Tiraje requerido: ${res.quantity} piezas\n` +
                    `• Acabado: ${res.printOption}\n` +
                    `• Estimado calculado: $${res.totalFormatted} MXN ($${res.unitFormatted}/pza)\n\n` +
                    `¿Tienen existencias o tiempo de entrega estimado para recolección en taller o envío en CDMX?`;
            }

            const encoded = encodeURIComponent(message);
            window.open(`https://wa.me/525625809077?text=${encoded}`, '_blank');
        });
    }
}

/* Mobile Navigation Toggle */
function initMobileNavigation() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

    if (!toggleBtn || !drawer) return;

    function openMenu() {
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.classList.add('is-active');
        drawer.classList.add('is-open');
        if (overlay) overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('is-active');
        drawer.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    drawerLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

/* FAQ Accordion */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-answer');

        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all items
            faqItems.forEach((other) => {
                const otherTrigger = other.querySelector('.faq-trigger');
                const otherContent = other.querySelector('.faq-answer');
                if (otherTrigger && otherContent) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherContent.style.maxHeight = null;
                    other.classList.remove('is-open');
                }
            });

            // If not previously expanded, open this one
            if (!isExpanded) {
                trigger.setAttribute('aria-expanded', 'true');
                item.classList.add('is-open');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    initPackagingWorkbench();
    initMobileNavigation();
    initFaqAccordion();
});
