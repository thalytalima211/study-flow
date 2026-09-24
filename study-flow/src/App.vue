<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg study-navbar">
      <div class="container">
        
        <RouterLink to="/" class="navbar-brand study-brand">
          <span class="brand-icon">✓</span>
          <span>Study<span>Flow</span></span>
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="collapse navbar-collapse">
          <div class="navbar-nav ms-auto">
            <RouterLink to="/" class="nav-link me-2">
              Início
            </RouterLink>

            <RouterLink to="/dashboard" class="nav-link">
              Dashboard
            </RouterLink>
          </div>
        </div>

      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.study-navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e9e9ef;
  min-height: 72px;
}

.study-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #3f2e75;
  text-decoration: none;
}

.study-brand span:last-child span {
  color: #f3f1f9;
}

.brand-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3f2e75;
  color: #ffffff;

  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
}

.nav-link {
  color: #f3f1f9;
  font-weight: 500;
  padding: 8px 16px !important;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #3f2e75;
  background-color: #f3f1f9;
}

.nav-link.router-link-active {
  color: #3f2e75;
  background-color: #f3f1f9;
  font-weight: 600;
}

.navbar-toggler {
  border: none;
  box-shadow: none !important;
}

.navbar-toggler:focus {
  box-shadow: none;
}
</style>