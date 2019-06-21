workflow "test" {
  resolves = [
    "test agent"
  ]
  on = "push"
}

action "install agent" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd agent install"
}

action "test agent" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install agent"]
  args = "--cwd agent test"
}
