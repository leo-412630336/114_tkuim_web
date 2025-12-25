document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const submitBtn = document.getElementById("submitBtn");
    const viewListBtn = document.getElementById("viewListBtn");
    const successMessage = document.getElementById("successMessage");
    const listOutput = document.getElementById("listOutput");

    const interestsContainer = document.getElementById("interestsContainer");
    const termsCheckbox = document.getElementById("terms");

    let selectedInterests = new Set();

    interestsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("interest-tag")) {
            const tag = e.target;
            const interest = tag.dataset.interest;

            if (selectedInterests.has(interest)) {
                selectedInterests.delete(interest);
                tag.classList.remove("selected");
            } else {
                selectedInterests.add(interest);
                tag.classList.add("selected");
            }
        }
    });

    form.addEventListener("submit", async e => {
        e.preventDefault();

        if (selectedInterests.size === 0) {
            alert("請至少選擇一個興趣");
            return;
        }

        if (!termsCheckbox.checked) {
            alert("請先勾選服務條款");
            return;
        }

        const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
            interests: Array.from(selectedInterests),
        };

        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        try {
            const res = await fetch("http://localhost:3001/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                alert("錯誤：" + JSON.stringify(data.error, null, 2));
                return;
            }

            successMessage.classList.remove("hidden");
            successMessage.textContent = "註冊成功！目前總數：" + data.total;

        } catch (err) {
            alert("伺服器錯誤");
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
        }
    });

    viewListBtn.addEventListener("click", async () => {
        const res = await fetch("http://localhost:3001/api/signup");
        const data = await res.json();

        listOutput.classList.remove("hidden");
        listOutput.textContent = JSON.stringify(data, null, 2);
    });
});