<style>
    html,
    body {
        overflow-x: hidden;
    }
</style>
<style>
    .whatsapp-icon {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        background-color: #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        transition: transform 0.3s ease-in-out;
    }

    .whatsapp-icon:hover {
        transform: scale(1.1);
    }

    .whatsapp-icon img {
        width: 40px;
        height: 40px;
    }

    @keyframes glow {
        0% {
            filter: grayscale(100%);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        50% {
            filter: grayscale(0%);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        100% {
            filter: grayscale(100%);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }
    }

    .whatsapp-icon img {
        width: 40px;
        height: 40px;
        transition: filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .whatsapp-icon:hover img {
        animation: glow 1s infinite alternate;
    }

    @media (max-width: 768px) {
        .whatsapp-icon {
            width: 50px;
            height: 50px;
        }

        .whatsapp-icon img {
            width: 30px;
            height: 30px;
        }
    }
</style>
