(function () {
    function isStandalone() {
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        if (navigator.standalone) {
            return true;
        }
        if (document.referrer && document.referrer.startsWith('android-app://')) {
            return true;
        }
        return false;
    }

    function onReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    onReady(function () {
        var notice = document.getElementById('pwa-notice');
        if (!notice) {
            // Create the notice element if not present
            notice = document.createElement('div');
            notice.id = 'pwa-notice';
            notice.innerHTML = `
                <div class="pwa-notice-content">
                    <p>이 프로그램은 웹앱 형식으로 개발되었습니다.<br>
                       홈(<span class="fas fa-home"></span>) 화면에 바로가기(<span class="fas fa-plus-square"></span>)를 만들어서 사용</i> 해주시기 바랍니다.</p>
                </div>
            `;
            document.body.appendChild(notice);

            // Add CSS styles
            var style = document.createElement('style');
            style.textContent = `
                #pwa-notice {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                }
                #pwa-notice.is-visible {
                    opacity: 1;
                    visibility: visible;
                }
                .pwa-notice-content {
                    background: #fff;
                    padding: 50px 30px;
                    border-radius: 30px;
                    max-width: 85%;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    font: 16px/24px "Helvetica Neue", Helvetica, Arial, sans-serif;
                    color: #666;
                }
                .pwa-notice-content p {
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 1.6;
                    margin: 0;
                }
                .pwa-notice-content i,
                .pwa-notice-content span {
                    font-size: 22px;
                    color: #D1635D;
                    margin: 10px 0;
                }
                .pwa-notice-content strong {
                    color: #D1635D;
                }
                body.pwa-notice-open {
                    overflow: hidden;
                    pointer-events: none;
                }
                body.pwa-notice-open #pwa-notice {
                    pointer-events: auto;
                }
            `;
            document.head.appendChild(style);
        }

        var body = document.body;

        if (isStandalone()) {
            notice.remove();
            return;
        }

        notice.classList.add('is-visible');
        if (body) {
            body.classList.add('pwa-notice-open');
        }
    });
})();
