<template>
   <div class="form-panel two">
        <div class="form-header">
          <h1>Register Account</h1>
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="cpassword">Confirm Password</label>
              <input
                id="cpassword"
                type="password"
                name="cpassword"
                required="required"
              />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input id="email" type="email" name="email" required="required" />
            </div>
            <div class="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
</template>

<script setup>
</script>

<style scoped>
@import "../../../public/style/login.css";
</style>
