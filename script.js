document.addEventListener('DOMContentLoaded', function() {
    // Savatga qo'shish tugmalarini tanlash
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Savat hisoblagichi
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart span');
    
    // Har bir tugma uchun hodisa qo'shish
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mahsulot ma'lumotlarini olish
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Savatga qo'shish
            addToCart(productName, productPrice);
            
            // Animatsiya qo'shish
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1000);
        });
    });
    
    // Savatga qo'shish funksiyasi
    function addToCart(name, price) {
        // Savat hisoblagichini yangilash
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Mahsulot qo'shilganligi haqida xabar berish
        showNotification(`${name} savatga qo'shildi`);
        
        // Mahsulotni saqlash (localStorage orqali)
        saveCartItem(name, price);
    }
    
    // Xabar ko'rsatish funksiyasi
    function showNotification(message) {
        // Xabar elementi yaratish
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Xabarni sahifaga qo'shish
        document.body.appendChild(notification);
        
        // Xabarni ko'rsatish va yashirish
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Mahsulotni saqlash funksiyasi
    function saveCartItem(name, price) {
        // Mavjud savatni olish
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Yangi mahsulotni qo'shish
        cart.push({
            name: name,
            price: price,
            date: new Date().toISOString()
        });
        
        // Savatni saqlash
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Sahifa yuklanganda savatni tiklash
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount = cart.length;
        cartCountElement.textContent = cartCount;
    }
    
    // Mobil menyu tugmasini boshqarish
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Dropdown menyular uchun
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Mobil qurilmalar uchun bosilganda ochilish
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                content.classList.toggle('active');
            }
        });
    });
    
    // Sahifa yuklanganda savatni tiklash
    document.addEventListener('DOMContentLoaded', loadCart);});
